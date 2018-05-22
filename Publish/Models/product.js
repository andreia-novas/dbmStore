const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

class Product {
    constructor (price, productQuantity) {
        this.price = price;
		this.productQuantity = productQuantity;
		
        Object.defineProperty(this, 'productID', {enumerable: false});
    }

    /**
    *
    */
    all(callback){
        db.all("SELECT * FROM Product", Product, callback);
    }
}

module.exports = Product;
