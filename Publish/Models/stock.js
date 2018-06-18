const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Product = require('./product.js');


class Stock {
    constructor(quantity) {
        this.quantity = quantity;
		

        Object.defineProperty(this, 'stockID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Stock objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Stock;", Stock, callback);
    }

    /**
    * Method that gets a specific Stock object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Stock WHERE stockID = ?;", [id], Stock, callback);
    }

    /**
    * Method that removes a specific Stock object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Stock WHERE stockID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Stock object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.stockID){   //Se existir valor no id fazemos update

            db.run("UPDATE Stock SET quantity = ? WHERE stockID = ?;", [this.quantity, this.stockID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Stock (quantity) VALUES (?)", [this.quantity] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.stockID = id;});
        }
    }

    /**
	* Method that gets multiple Product objects
	* @param {*} callback function to be applied to the results query
	*/
	getProducts(callback) {
		return db.all("SELECT * FROM product WHERE stockID = ?", [this.stockID], Product, callback);
	}

}

module.exports = Stock;