class Product {
    constructor(productID, name, description, price, imgURLs) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.rate = null;
        this.price = price;
        this.imgURL = imgURLs;
        this.numSold = null;
    }
}

export default Product;
