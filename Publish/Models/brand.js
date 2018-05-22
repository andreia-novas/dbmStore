const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Brand {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'brandID', {enumerable: true, writable: true});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Brand;", Brand, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Brand WHERE brandID = ?;", [id], Brand, callback);
    }

//delete

    save(callback){
        if(this.brandID){   //Se existir valor no id fazemos update

            db.run("UPDATE Brand SET name = ? WHERE brandID = ?;", [this.name, this.brandID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Brand (name) VALUES (?)", [this.name] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.brandID = id;});
        }
    }

}

module.exports = Brand;
