import User from './user.js'

class Merchant extends User {
    constructor(userName, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false) {
        super(userName, password, email, userID, address, phoneNumber, loginStatus);
    }
}

const merchantConverter = {
    toFirestore: (merchant) => {
        return {
            userName: merchant.userName,
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
        return new Merchant(data.userName, data.password, data.email, data.userID, data.address, data.phoneNumber, data.loginStatus);
    },
};

export {Merchant, merchantConverter};