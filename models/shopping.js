import { CartItem } from './cartItem.js';
import Order from './order.js';

class Shopping {
	constructor() {
		this.shoppingId = null;
		this.orderList = [];
		this.cart = [];
	}
}

const shoppingConverter = {
	toFirestore: (shopping) => {
		return {
			shoppingId: shopping.shoppingId,
			orderList: shopping.orderList,
			cart: shopping.cart,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Shopping(data.shoppingId, data.orderList, data.cart);
	},
};

export { Shopping, shoppingConverter };
