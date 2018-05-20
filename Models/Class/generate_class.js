var mustache = require('mustache');
var fs = require('fs');

function renderClass(template, schema){
    
    var props = [];
    for(var p in schema.properties){
        props.push(p);
    }
    
    var view = {
        //Pegamos na primeira letra e colocamo-la em Maiscula e depois juntamos o resto da palavra em minúsculas
        classTitle: schema.title.charAt(0).toUpperCase()+ schema.title.substring(1),
        classProperties: props.join(", "),
        classConstructor: function () {
            var string = "";
            props.forEach(property => string += `this.${property} = ${property};\n\t\t` )
            return string; 
        }
    };
    
    var output = mustache.render(template, view);
    return output;
}

function generateClass(filename){
    //O filename é enviado a partir do index.js
    //O index lê a diretoria Schemas e envia o filename para esta função
    //Esta função importa o schema certo e faz render da classe para pasta Publish/Models
    fs.readFile('./Models/Class/class.mustache', function (err, data) {
        var schema = JSON.parse(fs.readFileSync(`./Models/Schemas/${filename}_schema.json`));
        fs.writeFile('./Publish/Models/'+ filename+'.js', renderClass(data.toString(), schema));
    });
   
}

module.exports.generateClass = generateClass;