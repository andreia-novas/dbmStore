var mustache = require('mustache');
var fs = require('fs');

/**
 * Função que cria a base de dados com as tabelas obtidas através dos models passados por argumento
 * @param {*} template 
 * @param {*} schema 
 */
function generate(dbName, models){
    var sqlite3 = require('sqlite3').verbose();
    var name = './Publish/Database/' + dbName.toString();

    var db = new sqlite3.Database(name, function (err) {
        if (err)
            return console.error(err.message);
        console.log('Connected to the in-memory SQlite database.');
    });

    //Por cada model vamos ler o schema que esta no seu path e construir a string para criar a tabela SQL (e em alguns casos fazer o alter table ou criar a tabela intermedia)
    models.forEach(model => {
        var schema = JSON.parse(fs.readFileSync(model.path));
        db.exec(mustache.render(fs.readFileSync('./Models/Database/create_table.mustache').toString(), createTableString(schema) ) );
    })
    
    db.close(function (err) {
        if (err)
            return console.error(err.message);
        console.log('Close the database connection.');
    });
}

/**
 * Função que cria uma string, para inserir numa query de base de dados, com a informação obtida de um schema
 * @param {*} schema 
 */
function createTableString(schema){

    var tableObject = {

        table_name: schema.title,
        primary_key: schema.title + "ID INTEGER PRIMARY KEY ",
        table_properties: function(){
            var propertiesString = "";

            for(var p in schema.properties){
                propertiesString += p.toString();
                
                //Devolve-me o valor que está dentro da propriedade p
                //p/ex: {"name:"{  "type": "string"  }} , p --> name | value --> {"type": "string"}
                var value = schema.properties[p];

                //Verifica-se o tipo do campo
                if(value.type === "string"){
                    propertiesString += " TEXT ";
                } else if(value.type === "number"){
                    propertiesString += " REAL ";
                } else {
                    propertiesString += ` ${value.type.toUpperCase()} ` ;
                }

                //Verificar se os campos são obrigatórios ou não
                if(schema.required.includes(p.toString())){
                    propertiesString += "NOT NULL "
                } 

                //Verificar se é único ou não
                if(value.unique){
                    propertiesString += "UNIQUE ";
                }

                propertiesString += ", ";
            }
            
            //Serve para tirar a vírgula e espaço que são colocados no final 
            return propertiesString.slice(0, propertiesString.length-2);
        },
        foreign_key: function(){
            if(schema.references){
                var refsString = "";
                schema.references.forEach((ref, index) =>{
                    var refsObject = schema.references[index];

                    if(refsObject.relation !== "M-M"){
                        //Se for M-M fazemos Alter table para adicionar as foreign key
                        refsString += `ALTER TABLE ${schema.title} ADD COLUMN ${refsObject.model}ID INTEGER 
                        REFERENCES ${refsObject.model} (${refsObject.model}ID);\n`
                    
                    } else {
                        //Caso contrário criamos a tabela intermediária
                        refsString += `CREATE TABLE ${schema.title}_${refsObject.model} (${schema.title}_${refsObject.model}ID INTEGER
                            PRIMARY KEY, ${schema.title}ID INTEGER NOT NULL , ${refsObject.model}ID INTEGER NOT NULL ,
                            FOREIGN KEY (${schema.title}ID) REFERENCES ${schema.title} (${schema.title}ID),
                            FOREIGN KEY (${refsObject.model}ID) REFERENCES ${refsObject.model} (${refsObject.model}ID) );`
                    }
                   
                }); 

                return refsString;        
            }
        }

    }
    return tableObject;
}

module.exports.generate = generate;