class Sale {
	constructor(userId, cart, money, time) {
        this.userId = userId;
        this.cart = cart;
		this.money = money;
		this.time = time;
	}
}

const saleConverter = {
	toFirestore: (sale) => {
		return {
            userId: sale.userId,
			cart: sale.cart,
			money: sale.money,
			time: sale.time,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Shopping(data.userId, data.cart, data.money, data.time);
	},
};

export { Sale, saleConverter };
