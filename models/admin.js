class Admin {
    constructor(username, password, adminID=null) {
        this.username = username;
        this.adminID = adminID;
        this.password = password;
    }
}

const adminConverter = {
    toFirestore: (admin) => {
        return {
            username: admin.username,
            adminID: admin.adminID,
            password: admin.password,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Admin(data.username, data.password, data.adminID);
    },
};

export {Admin, adminConverter};