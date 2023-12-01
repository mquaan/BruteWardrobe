import User from './user.js'

class Customer extends User {
    constructor(userName, userID, password, address, phoneNumber, email) {
        super(userName, userID, password, address, phoneNumber, email);
        this.activeStatus = activeStatus;
        this.shopping = shopping;
    }
}

export default Customer;