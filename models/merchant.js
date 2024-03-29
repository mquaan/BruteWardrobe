import User from './user.js';

class Merchant extends User {
    constructor(username, password, salary = 0, email = null, facebookId = null, userId = null, 
        address = null, phoneNumber = null, loginStatus = false, gender = 'male', dob = null, 
         dateCreated = null) 
    {
        super(username, password, email, facebookId, userId, address, phoneNumber, loginStatus, gender, dob);
        this.salary = salary;
        this.dateCreated = (new Date()).toISOString();
    }
}

const merchantConverter = {
    toFirestore: (merchant) => {
        return {
            username: merchant.username,
            userId: merchant.userId,
            password: merchant.password,
            address: merchant.address,
            phoneNumber: merchant.phoneNumber,
            email: merchant.email,
            loginStatus: merchant.loginStatus,
            gender: merchant.gender,
            dob: merchant.dob,
            salary: merchant.salary,
            dateCreated: merchant.dateCreated,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Merchant(data.username, data.password, data.salary, data.email,
            data.facebookId, data.userId, data.address, data.phoneNumber,
            data.loginStatus, data.gender, data.dob, data.dateCreated);
    },
};

export { Merchant, merchantConverter };
