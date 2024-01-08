import User from './user.js';

class Customer extends User {
	constructor(
		username,
		password,
		email,
		facebookId = null,
		userId = null,
		address = null,
		phoneNumber = null,
		loginStatus = false,
		gender = 'male',
		dob = null,
		activeStatus = false,
		shoppingId = null
	) {
		super(username, password, email, facebookId, userId, address, phoneNumber, loginStatus, gender, dob);
		this.activeStatus = activeStatus;
		this.shoppingId = shoppingId;
		this.dateCreated = new Date().toISOString();
	}
}

const customerConverter = {
	toFirestore: (customer) => {
		return {
			username: customer.username,
			userId: customer.userId,
			password: customer.password,
			address: customer.address,
			phoneNumber: customer.phoneNumber,
			email: customer.email,
			facebookId: customer.facebookId,
			gender: customer.gender,
			dob: customer.dob,
			loginStatus: customer.loginStatus,
			activeStatus: customer.activeStatus,
			shoppingId: customer.shoppingId,
			dateCreated: customer.dateCreated,
		};
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		return new Customer(
			data.username,
			data.password,
			data.email,
			data.facebookId,
			data.userId,
			data.address,
			data.phoneNumber,
			data.loginStatus,
			data.gender,
			data.dob,
			data.activeStatus,
			data.shoppingId,
			data.dateCreated
		);
	},
};

export { Customer, customerConverter };
