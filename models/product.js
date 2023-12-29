class Product {
    constructor(name, description, imgURLs, price, rate, productId=null) {
        this.name = name;
        this.description = description;
        this.imgURLs = imgURLs;
        this.price = price;
        this.rate = rate;
        this.productId = productId;
        this.numSold = 0;
    }
}

const productConverter = {
	toFirestore: (product) => {
		return {
            productId: product.productId,
            name: product.name,
            description: product.description,
            rate: product.rate,
            price: product.price,
            imgURLs: product.imgURLs,
            numSold: product.numSold,
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
            data.productId
		);
	},
};

export {Product, productConverter};
