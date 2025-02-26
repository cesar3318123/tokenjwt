class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static users = []; // Array de usuarios (base de datos temporal)

    static save(user) {
        this.users.push(user);
    }

    static findByUsername(username) {
        return this.users.find(user => user.username === username);
    }
}

module.exports = User;