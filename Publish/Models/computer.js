const dbpath = './Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Computer {
    constructor (ram, processor, gpu, weight, height, width) {
        this.ram = ram;
		this.processor = processor;
		this.gpu = gpu;
		this.weight = weight;
		this.height = height;
		this.width = width;
		
        Object.defineProperty(this, 'computerID', {enumerable: false});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Computer;", Computer, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Computer WHERE computerID = ?;", [id], Computer, callback);
    }
    
    
    /**
    * Get with all inner joins
    */
    static getWithAllJoins(callback) {
        return db.all("SELECT ram, processor, gpu, weight, height, width,model.model as model,category.category as category FROM Computer INNER JOIN model on model.modelID = computer.modelID INNER JOIN category on category.categoryID = computer.categoryID;", Computer, callback);
    }

    /**
    * Get all Computers with category id 
    */
    static getAllBycategory(id, callback) {
        return db.all("SELECT * FROM Computer Where categoryID = ?;", [id], Computer, callback);
    }

    /**
    *
    */
    static delete(id,callback){
        return db.get("DELETE FROM Computer WHERE computerID = ?;", [id], callback);
    }   

    save(callback){
        if(this.computerID){   //Se existir valor no id fazemos update

            db.run("UPDATE Computer SET ram = ?, processor = ?, gpu = ?, weight = ?, height = ?, width = ? WHERE computerID = ?;", [this.ram, this.processor, this.gpu, this.weight, this.height, this.width, this.computerID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
            db.run("INSERT INTO Computer (ram, processor, gpu, weight, height, width) VALUES (?, ?, ?, ?, ?, ?)", [this.ram, this.processor, this.gpu, this.weight, this.height, this.width] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.computerID = id;});
        }
    }

}

module.exports = Computer;