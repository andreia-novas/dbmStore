//Criação de um servidor em NodeJS utilizando o módulo express
var express = require("express");
var fs = require('fs');

var bodyParser = require('body-parser');

var app = express();

//Ler o ficheiro com as configs para a geração de código
var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));

//Importar a função de gerar o servidor
var serverGenerator = require("./Server/generate_server.js");

//Importar a função de gerar as classes
var classGenerator = require("./Models/Class/generate_class.js");

//Importar a função de gerar a base de dados
var databaseGenerator = require("./Models/Database/generate_database.js");

//Importar as funções de gerar a api, frontoffice e backoffice
var apiGenerator = require("./Models/API/generate_api.js");

//Permite converter os dados que vem dos formulários
app.use(bodyParser.urlencoded());

//Redirecionar a rota para o ficheiro index.html
app.use(express.static('Public'));

app.get('/', function (req, res) {
    res.send("Hello World");
});

app.post('/generate', function(req, res){

    serverGenerator.serverGenerator();

    setTimeout(function(){
        //Gera as classes
        fs.readdir('./Models/Schemas', function(err, files){
            files.forEach(file => {
                classGenerator.generateClass(file.split('_')[0]);      
            });
        });
        
        // //Escrever os ficheiros que estao no staticFiles para as pastas de destino
        configJson.staticFiles.forEach(file => {
            fs.readFile(file.originalPath, function(err, data){
               fs.writeFile(file.destinationPath, data.toString());     
            });
        });
    
        //Gerar a BD
        databaseGenerator.generate(configJson.dbname, configJson.models);
    
        //Gerar a API
        apiGenerator.generateApi();
        //Gerar o frontoffice
        apiGenerator.generateFrontoffice();
        //Gerar o backoffice
        apiGenerator.generateBackoffice();
    
        res.send("The code was generated to the Publish directory.");
        
    }, 1000);
});

const server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
