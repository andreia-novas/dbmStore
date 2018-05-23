var mustache = require('mustache');
var fs = require('fs');

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

function generateApi(){
    fs.readFile('./Models/API/api.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/api.js', render(data.toString(), configJson));
    });
   
}

function generateFrontoffice(){
    fs.readFile('./Models/API/frontoffice.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/frontoffice.js', render(data.toString(), configJson));
    });
   
}

function generateBackoffice(){
    fs.readFile('./Models/API/backoffice.mustache', function (err, data) {
        var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/backoffice.js', render(data.toString(), configJson));
    });
   
}

module.exports.generateApi = generateApi;
module.exports.generateFrontoffice = generateFrontoffice;
module.exports.generateBackoffice = generateBackoffice;