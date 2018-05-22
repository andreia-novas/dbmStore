const dbpath = './Publish/Database/projetodbm.db'
var db = require('../ORM/sqlite.js')(dbpath) 

class Product {
    constructor (price, productQuantity) {
        this.price = price;
		this.productQuantity = productQuantity;
		
        Object.defineProperty(this, 'productID', {enumerable: false});
    }

    /**
    *
    */
    static all(callback){
        return db.all("SELECT * FROM Product;", Product, callback);
    }

    /**
    *
    */
    static get(id, callback){
        return db.get("SELECT * FROM Product WHERE productID = ?;", [id], Product, callback);
    }

    /**
    *
    */
    static save(callback){
        if(this.productID){   //Se existir valor no id fazemos update

            db.run("UPDATE Product SET price = ?, productQuantity = ? WHERE productID = ?;", [this.price, this.productQuantity, this.productID], callback);

        } else {    //Caso contrário adiciona-se um novo campo a tabela
        //MUDAR ISTO DE NAO METER OS CAMPOS
            db.run("INSERT INTO Product (price, productQuantity) VALUES (?, ?)", [this.price, this.productQuantity] , callback);
            //db.run("SELECT last_insert_rowid()", [],(id) => {this.productID = id;});
        }
    }

//delete
}
Product.mappingDBtoObject = {
    price:'price', productQuantity:'productQuantity', productID:'productID'
}


module.exports = Product;
