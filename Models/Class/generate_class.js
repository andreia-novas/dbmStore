var mustache = require('mustache');
var fs = require('fs');

function renderClass(template, schema){
    
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
        iterateArrayForInsert: props.map(p => "this."+p).join(", ")
    };
    var output = mustache.render(template, view);
    return output;
}

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