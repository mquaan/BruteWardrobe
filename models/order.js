import Product from './product.js';
import Payment from './payment.js';

class Order {
    constructor(orderID, productList, quantityList, dateCreated, paymentInfo, deliverInfo) {
        this.orderID = orderID;
        this.productList = productList;
        this.quantityList = quantityList;
        this.sizeList = [];
        this.colorList = [];
        
        // Processing, Confirmed, Shipping, Delivered, Completed
        this.orderStatus = 'Processing';

        this.dateCreated = dateCreated;
        this.dateShipped = null;
        this.paymentInfo = paymentInfo;
        this.deliverInfo = deliverInfo;
    }
}

export default Order;
