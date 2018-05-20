var mustache = require('mustache');

function generateClass(template, schema){
    
    var props = [];
    for(var p in schema.properties){
        props.push(p);
    }
    
    var view = {
        classTitle: schema.title,
        classProperties: props.join(),
        classConstructor: function () {
            var string = "";
            props.forEach(property => string += `this.${property} = ${property};\n` )
            return string; 
        }
    };
    
    var output = mustache.render(template, view);
    return output;
}