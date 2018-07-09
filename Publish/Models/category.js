const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Computer = require('./computer.js');


class Category {
    constructor(name, computerID) {
        this.name = name;
		this.computerID = computerID;
		

        Object.defineProperty(this, 'categoryID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Category objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Category;", Category, callback);
    }

    /**
    * Method that gets a specific Category object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Category WHERE categoryID = ?;", [id], Category, callback);
    }

    /**
    * Method that removes a specific Category object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Category WHERE categoryID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Category object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.categoryID){   //Se existir valor no id fazemos update

            db.run("UPDATE Category SET name = ?, computerID = ? WHERE categoryID = ?;", [this.name, this.computerID, this.categoryID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Category (name, computerID) VALUES (?, ?)", [this.name, this.computerID] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.categoryID = id;});
        }
    }

    /**
	* Method that gets multiple Computer objects
	* @param {*} callback function to be applied to the results query
	*/
	getComputers(callback) {
		return db.all("SELECT * FROM computer WHERE categoryID = ?", [this.categoryID], Computer, callback);
	}

}

module.exports = Category;