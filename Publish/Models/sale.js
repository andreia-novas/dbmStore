const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Product = require('./product.js');


class Sale {
    constructor(date, productID) {
        this.date = date;
		this.productID = productID;
		

        Object.defineProperty(this, 'saleID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Sale objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Sale;", Sale, callback);
    }

    /**
    * Method that gets a specific Sale object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Sale WHERE saleID = ?;", [id], Sale, callback);
    }

    /**
    * Method that removes a specific Sale object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Sale WHERE saleID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Sale object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.saleID){   //Se existir valor no id fazemos update

            db.run("UPDATE Sale SET date = ?, productID = ? WHERE saleID = ?;", [this.date, this.productID, this.saleID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Sale (date, productID) VALUES (?, ?)", [this.date, this.productID] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.saleID = id;});
        }
    }

    

}

module.exports = Sale;