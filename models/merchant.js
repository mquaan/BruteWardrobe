import User from './user.js';

class Merchant extends User {
    constructor(username, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false) {
        super(username, password, email, userID, address, phoneNumber, loginStatus);
    }
}

const merchantConverter = {
    toFirestore: (merchant) => {
        return {
            username: merchant.username,
            userID: merchant.userID,
            password: merchant.password,
            address: merchant.address,
            phoneNumber: merchant.phoneNumber,
            email: merchant.email,
            loginStatus: merchant.loginStatus,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Merchant(data.username, data.password, data.email, data.userID, data.address, data.phoneNumber, data.loginStatus);
    },
};

export { Merchant, merchantConverter };
