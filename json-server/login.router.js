const service = require('./service');
const router = require('express').Router();

router.post('/', (req, res) => {
    let cred = req.body;
    const findedUser = service.getUserByName(cred.login);
    if(findedUser) {
       if(findedUser.password === cred.password) {
           res.status(200).send(findedUser);
       } else {
           res.status(400).send('Password is incorrect');
       }
    } else {
        res.status(400).send('User not found');
    }
});
module.exports = router;