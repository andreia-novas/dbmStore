const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Computer = require('./computer.js');


class Model {
    constructor(name, brandID, computerID) {
        this.name = name;
		this.brandID = brandID;
		this.computerID = computerID;
		

        Object.defineProperty(this, 'modelID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Model objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Model;", Model, callback);
    }

    /**
    * Method that gets a specific Model object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Model WHERE modelID = ?;", [id], Model, callback);
    }

    /**
    * Method that removes a specific Model object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Model WHERE modelID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Model object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.modelID){   //Se existir valor no id fazemos update

            db.run("UPDATE Model SET name = ?, brandID = ?, computerID = ? WHERE modelID = ?;", [this.name, this.brandID, this.computerID, this.modelID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Model (name, brandID, computerID) VALUES (?, ?, ?)", [this.name, this.brandID, this.computerID] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.modelID = id;});
        }
    }

    /**
	* Method that gets a Computer object
	* @param {*} callback function to be applied to the results query
	*/
	getComputer(callback) {
		return db.get("SELECT * FROM computer WHERE modelID = ?", [this.modelID], Computer, callback);
	}

}

module.exports = Model;