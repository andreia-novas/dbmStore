const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

class Stock {
    constructor (quantity) {
        this.quantity = quantity;
		
        Object.defineProperty(this, 'stockID', {enumerable: false});
    }

    /**
    *
    */
    all(callback){
        db.all("SELECT * FROM Stock", Stock, callback);
    }
}

module.exports = Stock;
