const mustache = require('mustache');
const fs = require('fs');

/**
 * Função que faz a renderização entre um template e a informação obtida de um ficheiro json
 * @param {*} template 
 * @param {*} configJson ficheiro json com a informação que queremos renderizar
 */
function render(template, configJson){
    const view = { 
        models: configJson.models.map(model => {
            const obj = {
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
        const configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/api.js', render(data.toString(), configJson));
    });
}

/**
 * Função que lê o template do frontoffice e o config.json e cria um ficheiro js com a informação obtida dos ficheiros lidos
 */
function generateFrontoffice(){
    fs.readFile('./Models/API/front_endT.mustache', function (err, data) {
        const configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        configJson.models.forEach(element => {
            const schema = require(`../Schemas/${element.name}_schema.json`);
            const objs = {};
            objs.title = schema.title;
            objs.rows = [];
            fs.writeFile(`./Publish/Controllers/api_${element.name}.js`, mustache.render(data.toString(), objs));
        });
    });
}

/**
 * Função que lê o template do backoffice e o config.json e cria um ficheiro js com a informação obtida dos ficheiros lidos
 */
function generateBackoffice(){
    fs.readFile('./Models/API/backoffice.mustache', function (err, data) {
        const configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
        fs.writeFile('./Publish/Controllers/backoffice.js', render(data.toString(), configJson));
    });
   
}

module.exports.generateApi = generateApi;
module.exports.generateFrontoffice = generateFrontoffice;
module.exports.generateBackoffice = generateBackoffice;