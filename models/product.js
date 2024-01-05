class Product {
    constructor(name, description, imgURLs, price, rate, numSold=0, productId=null, last_updated_by=null) {
        this.name = name;
        this.description = description;
        this.imgURLs = imgURLs;
        this.price = price;
        this.rate = rate;
        this.numSold = numSold;
        this.productId = productId;
        this.last_updated_by = null;
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
            last_updated_by: product.last_updated_by
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
            data.productId,
            data.last_updated_by
		);
	},
};

export {Product, productConverter};
