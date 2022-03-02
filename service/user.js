//Module
const userModel = require('../models/userModel');

// const users = [
//     { _id: 1, username: 'admin', password: '1' },
//     { _id: 1, username: 'manager', password: '1' },
// ]



//select * from users where username = 'username'
exports.login = async function login(username) {
    // const user = users.filter(u => u.username === username)[0] || null;
    //select id, username,password where username = username
    const user = await userModel.findOne({ username: username }, 'id username password');
    return user;
}


//insert
exports.register = async function (username,password) {
    const user = new userModel({username,password});
    return await user.save();
    
}