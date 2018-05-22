const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

class Model {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'modelID', {enumerable: false});
    }

    /**
    *
    */
    all(callback){
        db.all("SELECT * FROM Model", Model, callback);
    }
}

module.exports = Model;
