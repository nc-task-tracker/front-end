const service = require('./service');
const router = require('express').Router();

router.get('/', (req, res) => {
    let result = service.getUsers();
    res.status(200).json(result);
});
router.get('/:userId', (req,res) => {
    const user = service.getUser(req.params.userId);
    res.status(200).json(user);
});
router.post('/', (req, res) => {
    let user = service.createUser(req.body);
    res.status(200).json(user);
});
router.put('/', (req, res) => {
    let user = service.updateUser(req.body);
    res.status(200).json(user);
});
router.delete('/:id', (req, res) => {
    service.deleteUser(req.params.id);
    res.status(200);
    res.send('');
});
module.exports = router;