class Shopping {
	constructor(orderList = [], cart = [], shoppingId=null) {
		this.orderList = orderList;
		this.cart = cart;
		this.shoppingId = shoppingId;
	}
}

const shoppingConverter = {
	toFirestore: (shopping) => {
		return {
			orderList: shopping.orderList,
			cart: shopping.cart,
			shoppingId: shopping.shoppingId,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Shopping(data.orderList, data.cart, data.shoppingId);
	},
};

export { Shopping, shoppingConverter };
