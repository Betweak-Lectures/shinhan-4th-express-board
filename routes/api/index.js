const router = require('express').Router();

router.use('/board', require('./board'));
router.use('/users', require('./users'));

module.exports = router;