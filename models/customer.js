import User from './user.js';

class Customer extends User {
    constructor(userName, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false, activeStatus = false, shopping = null) {
        super(userName, password, email, userID, address, phoneNumber, loginStatus);
        this.activeStatus = activeStatus;
        this.shopping = shopping;
    }
}

const customerConverter = {
    toFirestore: (customer) => {
        return {
            userName: customer.userName,
            userID: customer.userID,
            password: customer.password,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            loginStatus: customer.loginStatus,
            activeStatus: customer.activeStatus,
            shopping: customer.shopping,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Customer(data.userName, data.password, data.email, data.userID, data.address, data.phoneNumber, data.loginStatus, data.activeStatus, data.shopping);
    },
};

export { Customer, customerConverter };
