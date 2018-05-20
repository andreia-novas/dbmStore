class Stock {
    constructor (quantity) {
        this.quantity = quantity;
		
        Object.defineProperty(this, 'id', {enumerable: false});
    }
}
