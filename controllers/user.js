
const userService = require('../service/user');
const bcrypt = require('bcryptjs');

exports.login = async function login(username, password) {
    const user = await userService.login(username);
    if (!user) {
        return null;
    }
    const checkPass = user.password === password;
    if (!checkPass) {
        return null;
    }
    return { id: user.id, username: user.username };
}

exports.register = async function (username, password, confirm_password) {
    if (password != confirm_password) return null;
    let user = await userService.login(username);
    if (user) return null;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = await userService.register(username, hash);
    return { _id: user._id };
}