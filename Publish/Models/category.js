const dbpath = './Database/projetodbm.db'
<<<<<<< HEAD
var db = require('../Database/sqlite.js')(dbpath) 
=======
var db = require('../ORM/sqlite.js')(dbpath) 
>>>>>>> ce7d4a15604a2c533cd1d38f96d94545429a3c06

class Category {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'categoryID', {enumerable: true, writable: true});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Category;", Category, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Category WHERE categoryID = ?;", [id], Category, callback);
    }
    
    


    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Category WHERE categoryID = ?;", [id], callback);
    }   

    save(callback){
        if(this.categoryID){   //Se existir valor no id fazemos update

            db.run("UPDATE Category SET name = ? WHERE categoryID = ?;", [this.name, this.categoryID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Category (name) VALUES (?)", [this.name] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.categoryID = id;});
        }
    }

}

module.exports = Category;