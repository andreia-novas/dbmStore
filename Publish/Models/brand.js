const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Model = require('./model.js');


class Brand {
    constructor(name, modelID) {
        this.name = name;
		this.modelID = modelID;
		

        Object.defineProperty(this, 'brandID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Brand objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Brand;", Brand, callback);
    }

    /**
    * Method that gets a specific Brand object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Brand WHERE brandID = ?;", [id], Brand, callback);
    }

    /**
    * Method that removes a specific Brand object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Brand WHERE brandID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Brand object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.brandID){   //Se existir valor no id fazemos update

            db.run("UPDATE Brand SET name = ?, modelID = ? WHERE brandID = ?;", [this.name, this.modelID, this.brandID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Brand (name, modelID) VALUES (?, ?)", [this.name, this.modelID] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.brandID = id;});
        }
    }

    /**
	* Method that gets multiple Model objects
	* @param {*} callback function to be applied to the results query
	*/
	getModels(callback) {
		return db.all("SELECT * FROM model WHERE brandID = ?", [this.brandID], Model, callback);
	}

}

module.exports = Brand;