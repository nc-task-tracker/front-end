const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const app = express();
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

const userUrl = '/api/users';
const loginUrl = '/api/login';
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(userUrl, userRouter);
app.use(loginUrl, loginRouter);
app.listen(3000, () => {
    console.log('Fake API server is listening on port 3000');
});