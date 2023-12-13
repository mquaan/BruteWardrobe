import Cart from './cart.js';
import Order from './order.js';

class Shopping {
    constructor(orderList = []) {
        this.orderList = [];
        this.cart = new Cart();
    }
}

export default Shopping;