class Admin {
    constructor(username, password, userId=null) {
        this.username = username;
        this.password = password;
        this.userId = userId;
    }
}

const adminConverter = {
    toFirestore: (admin) => {
        return {
            username: admin.username,
            password: admin.password,
            userId: admin.userId,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Admin(data.username, data.password, data.userId);
    },
};

export {Admin, adminConverter};