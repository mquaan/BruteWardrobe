import User from './user.js'

class Customer extends User {
    constructor(userName, userID, password, address, phoneNumber, email) {
        super(userName, userID, password, address, phoneNumber, email);
        this.activeStatus = false;
        this.shopping = null;
    }
}

export default Customer;