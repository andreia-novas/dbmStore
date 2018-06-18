const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Sale = require('./sale.js');


class Product {
    constructor(price, productQuantity) {
        this.price = price;
		this.productQuantity = productQuantity;
		

        Object.defineProperty(this, 'productID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Product objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Product;", Product, callback);
    }

    /**
    * Method that gets a specific Product object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Product WHERE productID = ?;", [id], Product, callback);
    }

    /**
    * Method that removes a specific Product object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Product WHERE productID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Product object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.productID){   //Se existir valor no id fazemos update

            db.run("UPDATE Product SET price = ?, productQuantity = ? WHERE productID = ?;", [this.price, this.productQuantity, this.productID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Product (price, productQuantity) VALUES (?, ?)", [this.price, this.productQuantity] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.productID = id;});
        }
    }

    

}

module.exports = Product;