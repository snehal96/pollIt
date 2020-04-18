var router = require('express').Router();
var handler = require('../handlers');

router.post('/register', handler.register);
router.post('/login', handler.login);

module.exports = router;