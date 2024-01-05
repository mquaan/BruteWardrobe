import Payment from './payment.js';

class Order {
    constructor(cart, paymentInfo, deliverInfo) {
        this.orderID = null;
        this.cart = cart;

        // Processing, Confirmed, Shipping, Delivered, Completed
        this.orderStatus = 'Processing';
        this.last_updated = null;

        this.dateCreated = new Date();
        this.dateShipped = null;
        this.paymentInfo = paymentInfo;
        this.deliverInfo = deliverInfo;
    }
}

export default Order;
