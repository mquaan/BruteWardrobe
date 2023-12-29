import User from './user.js';

class Merchant extends User {
    constructor(username, password, email, userId = null, address = null, phoneNumber = null, loginStatus = false, gender = 'male', dob=null, experience = 0, salary = 0) {
        super(username, password, email, userId, address, phoneNumber, loginStatus, gender, dob);
        this.experience = experience;
        this.salary = salary;
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
            experience: merchant.experience,
            salary: merchant.salary,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Merchant(data.username, data.password, data.email,
             data.userId, data.address, data.phoneNumber, data.loginStatus,
             data.gender, data.dob,
             data.experience, data.salary);
    },
};

export { Merchant, merchantConverter };
