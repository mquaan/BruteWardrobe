class Product {
    constructor(productId = null, name, description, price, imgURLs) {
        this.name = name;
        this.description = description;
        this.rate = null;
        this.price = price;
        this.imgURLs = imgURLs;
        this.numSold = 0;
        this.productId = productId;
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
            data.productId,
            data.name,
            data.description,
            data.rate,
            data.price,
            data.imgURLs,
            data.numSold,
		);
	},
};

export {Product, productConverter};
