class User {
    constructor(username, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false) {
        this.username = username;
        this.userID = null;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.loginStatus = loginStatus;
    }
}

export default User;
