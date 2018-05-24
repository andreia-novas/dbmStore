var mustache = require('mustache');
var fs = require('fs');

/**
 * Função que faz a renderização entre um template e a informação obtida de um schema
 * @param {*} template 
 * @param {*} schema 
 */
function renderClass(template, schema) {

    //array com as propriedades do schema
    var props = [];
    for (var p in schema.properties) {
        props.push(p);
    }

    var view = {
        dbName: JSON.parse(fs.readFileSync('./Server/config.json')).dbname,

        //Pegamos na primeira letra e colocamo-la em Maiscula e depois juntamos o resto da palavra em minúsculas
        classTitle: schema.title.charAt(0).toUpperCase() + schema.title.substring(1),
        idField: schema.title + "ID",
        classProperties: props.join(", "),
        classConstructor: function () {
            var string = "";
            props.forEach(property => {
                // if (schema.required.includes(property)) {   //se a property for required meter uma verificação para garantir que não seja null/undefined
                    // string += `if (${property}) {\n\t\t\tthis.${property} = ${property};\n\t\t}\n\t\t`;
                // } else {
                    string += `this.${property} = ${property};\n\t\t`;
                // }
            });
            return string;
        },

        //Serve para criar os gets consoante a relação entre entidades
        getRelation: function () {
            var string = "";
            schema.references.forEach(ref => {
                if (ref.nonDependent || ref.relation == "M-M") {
                    var modelUpperCase = ref.model.charAt(0).toUpperCase() + ref.model.substring(1)

                    switch (ref.relation){
                        case "1-1": 
                            string +=`/**\n\t* Method that gets a ${modelUpperCase} object\n\t* @param {*} callback function to be applied to the results query\n\t*/\n\t`;
                            string += `get${modelUpperCase}(callback) {\n`;
                            string += `\t\treturn db.get("SELECT * FROM ${ref.model} WHERE ${this.idField} = ?", [this.${this.idField}], ${modelUpperCase}, callback);\n`;
                            string += "\t}";
                        break;

                        case "1-M":
                            string +=`/**\n\t* Method that gets multiple ${modelUpperCase} objects\n\t* @param {*} callback function to be applied to the results query\n\t*/\n\t`;
                            string += `get${modelUpperCase}s(callback) {\n`;
                            string += `\t\treturn db.all("SELECT * FROM ${ref.model} WHERE ${this.idField} = ?", [this.${this.idField}], ${modelUpperCase}, callback);\n`;
                            string += "\t}";
                        break;

                        case "M-M":
                        //IMPLEMENTAR
                        // var ids = db.run("SELECT idProduto FROM venda_produto WHERE idVenda = this.idVenda"); //array de ids

                        // ids.forEach(id => {
                        //     arrayDeProdutos.push(Produto.get(id))
                        // })
                        break;
                    }
                }

            });
            return string;
        },
        
        //Fazer o require das dependencias para ser usadas nos métodos get
        requireDependencies: schema.references.map(ref => {
            if(ref.nonDependent || ref.relation == "M-M"){
                var modelUpperCase = ref.model.charAt(0).toUpperCase() + ref.model.substring(1);
                return `var ${modelUpperCase} = require('./${ref.model}.js');\n`;
            }
        }).join(""),

        //juntar o nome da propriedade ao ? , p/ex: name = ?
        iterateProperties: function () {
            var string = "";
            props.forEach(property => string += `${property} = ?, `);
            string = string.slice(0, string.length - 2); //Retirar ultimo espaço e ultima virgula
            string += ` WHERE ${this.idField} = ?;`
            return string;
        },

        //juntar numa string todas as propriedades mais o id
        propertiesWithID: function () {
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
        iterateArrayForInsert: props.map(p => "this." + p).join(", ")
    };


    return mustache.render(template, view);
}

/**
 * Função que escreve um ficheiro com o filename passado por argumento
 * @param {*} filename 
 */
function generateClass(filename) {
    //O filename é enviado a partir do index.js
    //O index lê a diretoria Schemas e envia o filename para esta função
    //Esta função importa o schema certo e faz render da classe para pasta Publish/Models
    fs.readFile('./Models/Class/class.mustache', function (err, data) {
        var schema = JSON.parse(fs.readFileSync(`./Models/Schemas/${filename}_schema.json`));
        fs.writeFile('./Publish/Models/' + filename + '.js', renderClass(data.toString(), schema));
    });

}

module.exports.generateClass = generateClass;