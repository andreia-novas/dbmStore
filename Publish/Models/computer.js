const dbpath = './Publish/Database/projetodbm.db';
var db = require('../Database/sqlite.js')(dbpath); 
var Product = require('./product.js');


class Computer {
    constructor(name, ram, processor, gpu, weight, height, width) {
        this.name = name;
		this.ram = ram;
		this.processor = processor;
		this.gpu = gpu;
		this.weight = weight;
		this.height = height;
		this.width = width;
		

        Object.defineProperty(this, 'computerID', {enumerable: true, writable: true});
    }

    /**
    * Method that gets all the Computer objects from the database
    * @param {*} callback function to be applied to the results query
    */
    static all(callback) {
        return db.all("SELECT * FROM Computer;", Computer, callback);
    }

    /**
    * Method that gets a specific Computer object from the database
    * @param {*} id  id of the object to obtain
    * @param {*} callback function to be applied to the results query
    */
    static get(id, callback) {
        return db.get("SELECT * FROM Computer WHERE computerID = ?;", [id], Computer, callback);
    }

    /**
    * Method that removes a specific Computer object from the database
    * @param {*} id id of the object to remove
    * @param {*} callback function to be applied to the results query
    */
    static delete(id,callback) {
        return db.get("DELETE FROM Computer WHERE computerID = ?;", [id], callback);
    }   

    /**
    * Method that inserts or update a Computer object
    * @param {*} callback function to be applied to the results query
    */
    save(callback) {
        if(this.computerID){   //Se existir valor no id fazemos update

            db.run("UPDATE Computer SET name = ?, ram = ?, processor = ?, gpu = ?, weight = ?, height = ?, width = ? WHERE computerID = ?;", [this.name, this.ram, this.processor, this.gpu, this.weight, this.height, this.width, this.computerID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Computer (name, ram, processor, gpu, weight, height, width) VALUES (?, ?, ?, ?, ?, ?, ?)", [this.name, this.ram, this.processor, this.gpu, this.weight, this.height, this.width] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.computerID = id;});
        }
    }

    /**
	* Method that gets a Product object
	* @param {*} callback function to be applied to the results query
	*/
	getProduct(callback) {
		return db.get("SELECT * FROM product WHERE computerID = ?", [this.computerID], Product, callback);
	}

}

module.exports = Computer;