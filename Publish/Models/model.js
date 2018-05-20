class Model {
    constructor (name) {
        this.name = name;
		
        Object.defineProperty(this, 'id', {enumerable: false});
    }
}
