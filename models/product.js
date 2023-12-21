class Product {
    constructor(productID, name, description, price, imgURLs) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.rate = null;
        this.price = price;
        this.imgURLs = imgURLs;
        this.numSold = 0;
    }
}

export default Product;
