const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

class Sale {
    constructor (date) {
        this.date = date;
		
        Object.defineProperty(this, 'saleID', {enumerable: false});
    }

    /**
    *
    */
    all(callback){
        db.all("SELECT * FROM Sale", Sale, callback);
    }
}

module.exports = Sale;
