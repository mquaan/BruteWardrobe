class User {
    constructor(userName, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false) {
        this.userName = userName;
        this.userID = null;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.loginStatus = loginStatus;
    }
}

export default User;
