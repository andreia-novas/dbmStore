var mustache = require('mustache');
var fs = require('fs');

/**
 * Função que faz a renderização entre um template e a informação obtida de um schema
 * @param {*} template 
 * @param {*} schema 
 */
function renderClass(template, schema){
    
    //array com as propriedades do schema
    var props = [];
    for(var p in schema.properties){
        props.push(p);
    }
    
    var view = {
        dbName: JSON.parse(fs.readFileSync('./Server/config.json')).dbname,
        
        //Pegamos na primeira letra e colocamo-la em Maiscula e depois juntamos o resto da palavra em minúsculas
        classTitle: schema.title.charAt(0).toUpperCase()+ schema.title.substring(1),
        idField: schema.title+"ID",
        classProperties: props.join(", "),
        classConstructor: function () {
            var string = "";
            props.forEach(property => string += `this.${property} = ${property};\n\t\t`);
            return string; 
        },

        //String with all the inner joins for relations 1-1 and 1-m
        //So that you can fetch the fields of the foreign keys tables
        // For example computer and category (select computer.*, category.name as category....)
        joins: function(){
            if(schema.references != null && schema.references.length > 0) { //If exists any references
                return schema.references.map((reference) => { //Iterate the references(map returns an array)
                    //Exclude the M-M
                    if (reference.relation === "1-1" || reference.relation === "1-M")
                        //String with the inner join construction
                        return `INNER JOIN ${reference.model} on ${reference.model}.${reference.model}ID = ${schema.title}.${reference.model}ID` 
                }).join(" ") //join array as a string separated by spaces
            }  
        },

        //String with all the columns for relations 1-1 and 1-m
        //So that you can fetch the fields of the foreign keys tables
        // produces string with "column.name as column" for each existent reference separated by commas
        joinsColumns: function() {
            if(schema.references != null && schema.references.length > 0) {
                return schema.references.map((reference) => { //Iterate the references(map returns an array)
                    //Exclude the M-M
                    if (reference.relation === "1-1" || reference.relation === "1-M")
                        //String with the column construction
                        return `${reference.model}.${reference.model} as ${reference.model}`
                }).join(",")//join array as a string separated by commas
            }
        }, 

        //Array with all the tables referenced in relations 1-M and M-M
        //So that you can build getAllByReferencedField
        //Returns an array so that it can be iterated in the template file
        joinsById: function(){
            if(schema.references != null && schema.references.length > 0) {
                return schema.references.reduce(function(result, reference) {
                    if (reference.relation === "1-M" || reference.relation === "M-M")
                        result.push(reference.model)
                    return result;
                }, []);
            }
        }, 

         //Array equal to the above....
        groupBy: function(){
            if(schema.references != null && schema.references.length > 0) {
                return schema.references.reduce(function(result, reference) {
                    if (reference.relation === "1-M" || reference.relation === "M-M")
                        result.push(reference.model)
                    return result;
                }, []);
            }
        },

        //juntar o nome da propriedade ao ? , p/ex: name = ?
        iterateProperties: function() {
            var string = "";
            props.forEach(property => string += `${property} = ?, `);
            string = string.slice(0, string.length - 2); //Retirar ultimo espaço e ultima virgula
            string += ` WHERE ${this.idField} = ?;`
            return string;
        },

        //juntar numa string todas as propriedades mais o id
        propertiesWithID: function() { 
            var string = "[";
            props.forEach(property => string += `this.${property}, `);
            string += `this.${this.idField}]`;
            return string;
        },

        //substitui todas as propriedades por um ? e coloca-as todas numa string separadas por vírgula
        //ex: (?, ?, ?)
        iterateValuesForInsert: props.map(p => "?").join(", "),

        //para cada uma das propriedades acrescentamos o this atras e juntamos todos os elementos, separados por uma vírgula, numa string 
        //ex: (this.name, this.age)
        //iterateArrayForInsert: props.map(p =>`this.${p}`).join(", ")
        iterateArrayForInsert: props.map(p => "this."+p).join(", ")
    };
    
    
    return mustache.render(template, view);
}

/**
 * Função que escreve um ficheiro com o filename passado por argumento
 * @param {*} filename 
 */
function generateClass(filename){
    //O filename é enviado a partir do index.js
    //O index lê a diretoria Schemas e envia o filename para esta função
    //Esta função importa o schema certo e faz render da classe para pasta Publish/Models
    fs.readFile('./Models/Class/class.mustache', function (err, data) {
        var schema = JSON.parse(fs.readFileSync(`./Models/Schemas/${filename}_schema.json`));
        fs.writeFile('./Publish/Models/'+ filename+'.js', renderClass(data.toString(), schema));
    });
   
}

module.exports.generateClass = generateClass;