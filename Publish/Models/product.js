const dbpath = './Database/projetodbm.db'
var db = require('../Database/sqlite.js')(dbpath) 

class Product {
    constructor (price, productQuantity) {
        this.price = price;
		this.productQuantity = productQuantity;
		
        Object.defineProperty(this, 'productID', {enumerable: true, writable: true});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Product;", Product, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Product WHERE productID = ?;", [id], Product, callback);
    }
    
    
    /**
    * Get with all inner joins
    */
    static getWithAllJoins(callback) {
        return db.all("SELECT price, productQuantity,stock.stock as stock,computer.computer as computer, FROM Product INNER JOIN stock on stock.stockID = product.stockID INNER JOIN computer on computer.computerID = product.computerID ;", Product, callback);
    }

    /**
    * Get all Products with stock id 
    */
    static getAllBystock(id, callback) {
        return db.all("SELECT * FROM Product Where stockID = ?;", [id], Product, callback);
    }
    /**
    * Get all Products with sale id 
    */
    static getAllBysale(id, callback) {
        return db.all("SELECT * FROM Product Where saleID = ?;", [id], Product, callback);
    }

    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Product WHERE productID = ?;", [id], callback);
    }   

    save(callback){
        if(this.productID){   //Se existir valor no id fazemos update

            db.run("UPDATE Product SET price = ?, productQuantity = ? WHERE productID = ?;", [this.price, this.productQuantity, this.productID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Product (price, productQuantity) VALUES (?, ?)", [this.price, this.productQuantity] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.productID = id;});
        }
    }

}

module.exports = Product;