import Payment from './payment.js';


class Order {
    constructor(orderId, cart, dateCreated, paymentInfo, deliverInfo) {
        this.orderId = orderId;
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
