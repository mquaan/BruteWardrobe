class CartItem {
	constructor(productId, quantity, size) {
		this.productId = productId;
		this.quantity = quantity;
		this.size = size;
	}
}

const cartItemConverter = {
	toFirestore: (cartItem) => {
		return {
			productId: cartItem.productId,
			quantity: cartItem.quantity,
			size: cartItem.size,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new CartItem(data.productId, data.quantity, data.size);
	},
};

export { CartItem, cartItemConverter };
