const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Category {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'categoryID', {enumerable: false});
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

    static delete(id,callback){
        return db.get("DELETE FROM Category WHERE categoryID = ? ", [this.categoryID], callback);
    }

    save(callback){
        if(this.categoryID){   //Se existir valor no id fazemos update

            db.run("UPDATE Category SET name = ? WHERE categoryID = ?;", [this.name, this.categoryID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
        //MUDAR ISTO DE NAO METER OS CAMPOS
            db.run("INSERT INTO Category (name) VALUES (?)", [this.name] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.categoryID = id;});
        }
    }

}
Category.mappingDBtoObject = {
    name:'name', categoryID:'categoryID'
}

module.exports = Category;
