const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Model {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'modelID', {enumerable: false});
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

    static delete(id,callback){
        return db.get("DELETE FROM Model WHERE modelID = ? ", [this.modelID], callback);
    }

    save(callback){
        if(this.modelID){   //Se existir valor no id fazemos update

            db.run("UPDATE Model SET name = ? WHERE modelID = ?;", [this.name, this.modelID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
        //MUDAR ISTO DE NAO METER OS CAMPOS
            db.run("INSERT INTO Model (name) VALUES (?)", [this.name] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.modelID = id;});
        }
    }

}
Model.mappingDBtoObject = {
    name:'name', modelID:'modelID'
}

module.exports = Model;
