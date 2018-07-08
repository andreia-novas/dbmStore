var fs = require("fs");
var del = require('del');
var mkdirp = require('mkdirp');

var mustache = require('mustache');
/**
 * Função que cria as diretorias na pasta Publish e gera o ficheiro server.js na pasta ./Publish/Server
 */
function serverGenerator(){

    //Apagar a pasta Publish
    del(['Publish']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));

        //Criação da pasta Controllers
        mkdirp('./Publish/Controllers', function (err) {
            if (err) console.error(err);
            else console.log('Folder Controllers created');
        });

        //Criação da pasta Models
        mkdirp('./Publish/Models', function (err) {
            if (err) console.error(err);
            else console.log('Folder Models created');
        });
    
        //Criação da pasta Views
        mkdirp('./Publish/Views', function (err) {
            if (err) console.error(err);
            else console.log('Folder Views created');
        });

        //Criação da pasta Database
        mkdirp('./Publish/Database', function (err) {
            if (err) console.error(err);
            else console.log('Folder Database created');
        });

        //Criação da pasta Images
        mkdirp('./Publish/Images', function (err) {
            if (err) console.error(err);
            else console.log('Folder Images created');
        });

        //Criação da pasta Server
        mkdirp('./Publish/Server', function (err) {
            if (err) console.error(err);
            else console.log('Folder Server created');

            // Geração do template do ficheiro para o servidor.
            fs.readFile('./Server/server.mustache', function (err, data) {
                var configJson = JSON.parse(fs.readFileSync('./Server/config.json'));
                var output = mustache.render(data.toString(), configJson);

                fs.writeFile('./Publish/Server/server.js', output);
            });
        });

    });

}

module.exports.serverGenerator = serverGenerator;