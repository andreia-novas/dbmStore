//Criação de um servidor em NodeJS utilizando o módulo express
var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

//Permite converter os dados que vem dos formulários
app.use(bodyParser.urlencoded());

//Redirecionar a rota para o ficheiro index.html
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send("Hello World");
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server listening at http://%s:%s", host, port)
});
