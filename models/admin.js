class Admin {
    constructor(username, password, adminId=null) {
        this.username = username;
        this.adminId = adminId;
        this.password = password;
    }
}

const adminConverter = {
    toFirestore: (admin) => {
        return {
            username: admin.username,
            adminId: admin.adminId,
            password: admin.password,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Admin(data.username, data.password, data.adminId);
    },
};

export {Admin, adminConverter};