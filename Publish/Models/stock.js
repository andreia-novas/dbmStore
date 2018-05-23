const dbpath = './Database/projetodbm.db'
<<<<<<< HEAD
var db = require('../Database/sqlite.js')(dbpath) 
=======
var db = require('../ORM/sqlite.js')(dbpath) 
>>>>>>> ce7d4a15604a2c533cd1d38f96d94545429a3c06

class Stock {
    constructor (quantity) {
        this.quantity = quantity;
		
        Object.defineProperty(this, 'stockID', {enumerable: true, writable: true});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Stock;", Stock, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Stock WHERE stockID = ?;", [id], Stock, callback);
    }
    
    


    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Stock WHERE stockID = ?;", [id], callback);
    }   

    save(callback){
        if(this.stockID){   //Se existir valor no id fazemos update

            db.run("UPDATE Stock SET quantity = ? WHERE stockID = ?;", [this.quantity, this.stockID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Stock (quantity) VALUES (?)", [this.quantity] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.stockID = id;});
        }
    }

}

module.exports = Stock;