class Admin {
    constructor(userName, password) {
        this.userName = userName;
        this.adminID = null;
        this.password = password;
    }
}

const adminConverter = {
    toFirestore: (admin) => {
        return {
            username: admin.userName,
            adminID: admin.adminID,
            password: admin.password,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Admin(data.username, data.password);
    },
};

export default {Admin, adminConverter};