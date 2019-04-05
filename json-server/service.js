const data = require('./stub/data');
const uuidv4 = require('uuid/v4');

module.exports.getUsers = () => {
    return data.users;
};

module.exports.createUser = (user) => {
   user.id = uuidv4();
   data.users.push(user);
   return user;
};

module.exports.updateUser = (user) => {
    const userIndex = data.users.findIndex(el => el.id === user.id);
    data.users.splice(userIndex, 1, user);
    return user;
};

module.exports.deleteUser = (userId) => {
    data.users = data.users.filter(el => el.id !== userId);
}

module.exports.getUserByName = (userName) => {
    return data.users.find(el => el.name === userName);
}

module.exports.getUser = (userId) => {
    return data.users.find(user => user.id === userId);
}