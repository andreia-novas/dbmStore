class Sale {
    constructor (date) {
        this.date = date;
		
        Object.defineProperty(this, 'id', {enumerable: false});
    }
}
