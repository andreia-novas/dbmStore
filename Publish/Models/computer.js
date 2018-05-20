class Computer {
    constructor (ram, processor, gpu, weight, height, width) {
        this.ram = ram;
		this.processor = processor;
		this.gpu = gpu;
		this.weight = weight;
		this.height = height;
		this.width = width;
		
        Object.defineProperty(this, 'id', {enumerable: false});
    }
}
