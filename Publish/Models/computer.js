const dbpath = './Publish/Database/projetodbm.db'
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

    static delete(id,callback){
        return db.get("DELETE FROM Computer WHERE computerID = ? ", [this.computerID], callback);
    }

    save(callback){
        if(this.computerID){   //Se existir valor no id fazemos update

            db.run("UPDATE Computer SET ram = ?, processor = ?, gpu = ?, weight = ?, height = ?, width = ? WHERE computerID = ?;", [this.ram, this.processor, this.gpu, this.weight, this.height, this.width, this.computerID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
        //MUDAR ISTO DE NAO METER OS CAMPOS
            db.run("INSERT INTO Computer (ram, processor, gpu, weight, height, width) VALUES (?, ?, ?, ?, ?, ?)", [this.ram, this.processor, this.gpu, this.weight, this.height, this.width] , callback);
            
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.computerID = id;});
        }
    }

}
Computer.mappingDBtoObject = {
    ram:'ram', processor:'processor', gpu:'gpu', weight:'weight', height:'height', width:'width', computerID:'computerID'
}

module.exports = Computer;
