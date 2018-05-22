const dbpath = './Publish/Database/projetodbm.db'
var db = require('../../sqlite.js')(dbpath) //TODO GERAR O FICHEIRO SQLITE PARA DENTRO DA PASTA PUBLISH PARA ACEDERMOS POR AQUI 

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
    all(callback){
        db.all("SELECT * FROM Computer", Computer, callback);
    }
}

module.exports = Computer;
