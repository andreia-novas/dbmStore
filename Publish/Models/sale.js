const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Sale {
    constructor (date) {
        this.date = date;
		
        Object.defineProperty(this, 'saleID', {enumerable: false});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Sale;", Sale, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Sale WHERE saleID = ?;", [id], Sale, callback);
    }

    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Sale WHERE saleID = ?;", [id], callback);
    }   

    save(callback){
        if(this.saleID){   //Se existir valor no id fazemos update

            db.run("UPDATE Sale SET date = ? WHERE saleID = ?;", [this.date, this.saleID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Sale (date) VALUES (?)", [this.date] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.saleID = id;});
        }
    }

}

module.exports = Sale;
