import Product from './product.js';
import Payment from './payment.js';

class Order {
    constructor(orderID, productList, dateCreated, paymentInfo, deliverInfo) {
        this.orderID = orderID;
        this.productList = productList;
        this.orderStatus = 'Open';
        this.dateCreated = dateCreated;
        this.dateShipped = null;
        this.paymentInfo = paymentInfo;
        this.deliverInfo = deliverInfo;
    }
}

export default Order;
