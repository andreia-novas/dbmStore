class Product {
    constructor (price, productQuantity) {
        this.price = price;
		this.productQuantity = productQuantity;
		
        Object.defineProperty(this, 'id', {enumerable: false});
    }
}
