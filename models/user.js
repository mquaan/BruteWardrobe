class User {
    constructor(username, password, email, userID = null, address = null, phoneNumber = null, loginStatus = false, gender = 'male', dob=null) {
        this.username = username;
        this.userID = null;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.loginStatus = loginStatus;
        this.gender = gender;
        this.dob = dob;
    }
}

export default User;
