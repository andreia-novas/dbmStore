//Criação de um servidor em NodeJS utilizando o módulo express
var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

//Importar a função de gerar o servidor
var serverGenerator = require("./Server/generate_server.js");

//Importar a função de gerar as classes
var classGenerator = require("./Models/Class/generate_class.js");

var databaseGenerator = require("./Models/Database/generate_database.js");

//Importar a função que gera o ficheiro sqlite.js necessário para o ORM
var sqlite = require("./Models/ORM/generate_sqlite.js");

//Permite converter os dados que vem dos formulários
app.use(bodyParser.urlencoded());

//Redirecionar a rota para o ficheiro index.html
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send("Hello World");
});


app.get('/generate', function(req, res){
    //Executa a função que vai criar as pastas e o ficheiro do servidor
    serverGenerator.serverGenerator();
    
    res.send('As pastas foram geradas');
})

app.get('/generate-class', function(req, res){
    fs.readdir('./Models/Schemas', function(err, files){
        files.forEach(file => {
            classGenerator.generateClass(file.split('_')[0]);      
        })
    })   
    
    sqlite.generateSqlite();

    res.send('As classes e o ficheiro para ORM foram gerados')
})

app.get('/generate-database', function (req, res) {
    var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
    databaseGenerator.generate(configJson.dbname, configJson.models);
    res.send("A base de dados foi gerada");
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
});
