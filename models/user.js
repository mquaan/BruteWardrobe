class User {
    constructor(userName, userID, password, email) {
        this.userName = userName;
        this.userID = userID;
        this.password = password;
        this.address = null;
        this.phoneNumber = null;
        this.email = email;
        this.loginStatus = false;
    }
    static userConverter = {
        toFirestore: (user) => {
            return {
                userName: user.userName,
                userID: user.userID,
                password: user.password,
                address: user.address,
                phoneNumber: user.phoneNumber,
                email: user.email,
                loginStatus: user.loginStatus,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new User(data.userName, data.userID, data.password, data.address, data.phoneNumber, data.email, data.loginStatus);
        },
    };
}

export default User;
