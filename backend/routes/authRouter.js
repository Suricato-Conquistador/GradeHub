const { signup } = require('../controllers/authController');

const router = require('express').Router();

router.route('/login').post(signup);

module.exports = router;