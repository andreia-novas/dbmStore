const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

class Brand {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'brandID', {enumerable: false});
    }

    /**
    *
    */
    all(callback){
        db.all("SELECT * FROM Brand", Brand, callback);
    }
}

module.exports = Brand;
