const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth');

router
    .route('/')
    .get(handler.showPolls)
    .post(auth, handler.createPoll);

router.get('/user', auth, handler.userPolls);

router
    .route('/:id')
    .get(handler.getPoll)
    .post(auth, handler.vote)
    .delete(auth, handler.deletePoll);

module.exports = router;