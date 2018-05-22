const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Stock {
    constructor (quantity) {
        this.quantity = quantity;
		
        Object.defineProperty(this, 'stockID', {enumerable: false});
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

//delete

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
