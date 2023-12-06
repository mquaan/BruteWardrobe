class Admin {
    constructor(userName, password, adminID=null) {
        this.userName = userName;
        this.adminID = adminID;
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
        return new Admin(data.username, data.password, data.adminID);
    },
};

export default {Admin, adminConverter};