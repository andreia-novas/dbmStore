var mustache = require('mustache');
var fs = require('fs');

//Função para gerar o ficheiro sqlite.js necessário para o ORM
function generateSqlite(){

    fs.readFile('./Models/ORM/sqlite.mustache', function (err, data) {
        fs.writeFile('./Publish/ORM/sqlite.js', mustache.render(data.toString(), {}));
    });    
   
}

module.exports.generateSqlite = generateSqlite;    