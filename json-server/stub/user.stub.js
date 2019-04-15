const uuidv4 = require('uuid/v4');

exports.users = [
    {
        id: uuidv4(),
        name: "guest",
        password: "123",
        email: "guest@gmail.com"
    },
    {
        id: uuidv4(),
        name: "admin",
        password: "1234",
        email: "admin@gmail.com",
        token: "1"
    },
    {
        id: uuidv4(),
        name: "user",
        password: "12345",
        email: "user@gmail.com"
    }
];
