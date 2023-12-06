import Cart from './cart.js';
import Order from './order.js';

class Shopping {
    constructor() {
        this.cart = new Cart();
        this.orderList = [];
    }
}

export default Shopping;