import User from './user.js'

class Merchant extends User {
    constructor(userName, userID, password, address, phoneNumber, email) {
        super(userName, userID, password, address, phoneNumber, email);
    }
}

export default Merchant;