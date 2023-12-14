import User from './user.js';

class Customer extends User {
    constructor(username, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false, gender = 'male', dob=null,
    activeStatus = false, shopping = null) {
        super(username, password, email, userID, address, phoneNumber, loginStatus, gender, dob);
        this.activeStatus = activeStatus;
        this.shopping = shopping;
    }
}

const customerConverter = {
    toFirestore: (customer) => {
        return {
            username: customer.username,
            userID: customer.userID,
            password: customer.password,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            gender: customer.gender,
            dob: customer.dob,
            loginStatus: customer.loginStatus,
            activeStatus: customer.activeStatus,
            shopping: customer.shopping,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Customer(data.username, data.password, data.email, data.userID, 
            data.address, data.phoneNumber, data.loginStatus, data.gender, data.dob, 
            data.activeStatus, data.shopping);
    },
};

export { Customer, customerConverter };
