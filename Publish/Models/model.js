const dbpath = './Database/projetodbm.db'
<<<<<<< HEAD
var db = require('../Database/sqlite.js')(dbpath) 
=======
var db = require('../ORM/sqlite.js')(dbpath) 
>>>>>>> ce7d4a15604a2c533cd1d38f96d94545429a3c06

class Model {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'modelID', {enumerable: true, writable: true});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Model;", Model, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Model WHERE modelID = ?;", [id], Model, callback);
    }
    
    
    /**
    * Get with all inner joins
    */
    static getWithAllJoins(callback) {
        return db.all("SELECT name,brand.brand as brand FROM Model INNER JOIN brand on brand.brandID = model.brandID;", Model, callback);
    }

    /**
    * Get all Models with brand id 
    */
    static getAllBybrand(id, callback) {
        return db.all("SELECT * FROM Model Where brandID = ?;", [id], Model, callback);
    }

    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Model WHERE modelID = ?;", [id], callback);
    }   

    save(callback){
        if(this.modelID){   //Se existir valor no id fazemos update

            db.run("UPDATE Model SET name = ? WHERE modelID = ?;", [this.name, this.modelID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Model (name) VALUES (?)", [this.name] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.modelID = id;});
        }
    }

}

module.exports = Model;