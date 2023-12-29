class Product {
    constructor(name, description, imgURLs, price, rate, numSold=0, last_modified=null, productId=null) {
        this.name = name;
        this.description = description;
        this.imgURLs = imgURLs;
        this.price = price;
        this.rate = rate;
        this.numSold = numSold;
        this.last_modified = last_modified;
        this.productId = productId;
    }
}

const productConverter = {
	toFirestore: (product) => {
		return {
            name: product.name,
            description: product.description,
            imgURLs: product.imgURLs,
            price: product.price,
            rate: product.rate,
            numSold: product.numSold,
            last_modified: product.last_modified,
            productId: product.productId,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Product(
            data.name, 
            data.description, 
            data.imgURLs, 
            data.price, 
            data.rate, 
            data.numSold, 
            data.last_modified, 
            data.productId
		);
	},
};

export {Product, productConverter};
