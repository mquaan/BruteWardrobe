import Payment from './payment.js';


class Order {
    constructor(orderID, cart, dateCreated, paymentInfo, deliverInfo) {
        this.orderID = orderID;
        this.cart = cart;

        // Processing, Confirmed, Shipping, Delivered, Completed
        this.orderStatus = 'Processing';
        this.last_updated = null;

        this.dateCreated = dateCreated;
        this.dateShipped = null;
        this.paymentInfo = paymentInfo;
        this.deliverInfo = deliverInfo;
    }
}

export default Order;
