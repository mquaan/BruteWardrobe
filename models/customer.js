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
		activeStatus = false
	) {
		super(username, password, email, facebookId, userId, address, phoneNumber, loginStatus, gender, dob);
		this.activeStatus = activeStatus;
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
			activeStatus: customer.activeStatus
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
		);
	},
};

export { Customer, customerConverter };
