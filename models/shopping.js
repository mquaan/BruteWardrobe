import { CartItem } from './cartItem.js';
import Order from './order.js';

class Shopping {
	constructor(orderList = [], cart = [], userId=null) {
		this.orderList = orderList;
		this.cart = cart;
		this.userId = userId;
	}
}

const shoppingConverter = {
	toFirestore: (shopping) => {
		return {
			orderList: shopping.orderList,
			cart: shopping.cart,
			userId: shopping.userId,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Shopping(data.orderList, data.cart, data.userId);
	},
};

export { Shopping, shoppingConverter };
