var mustache = require('mustache');
var fs = require('fs');

/**
 * Função que faz a renderização entre um template e a informação obtida de um ficheiro json
 * @param {*} template 
 * @param {*} configJson ficheiro json com a informação que queremos renderizar
 */
function render(template, configJson){

    var view = { 
        models: configJson.models.map(model => {
            var obj = {
                "lowerCaseName" : model.name,
                "upperCaseName" : model.name.charAt(0).toUpperCase() + model.name.slice(1, model.name.length)
            }
            return obj;
        })
    }

    return mustache.render(template, view);
}

/**
 * Função que lê o template da API e o config.json e cria um ficheiro js com a informação obtida dos ficheiros lidos
 */
function generateApi(){
    fs.readFile('./Models/API/api.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/api.js', render(data.toString(), configJson));
    });
   
}

/**
 * Função que lê o template do frontoffice e o config.json e cria um ficheiro js com a informação obtida dos ficheiros lidos
 */
function generateFrontoffice(){
    fs.readFile('./Models/API/frontoffice.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Server/frontoffice.js', render(data.toString(), configJson));
    });
   
}

/**
 * Função que lê o template do backoffice e o config.json e cria um ficheiro js com a informação obtida dos ficheiros lidos
 */
function generateBackoffice(){
    fs.readFile('./Models/API/backoffice.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Server/backoffice.js', render(data.toString(), configJson));
    });
   
}

module.exports.generateApi = generateApi;
module.exports.generateFrontoffice = generateFrontoffice;
module.exports.generateBackoffice = generateBackoffice;