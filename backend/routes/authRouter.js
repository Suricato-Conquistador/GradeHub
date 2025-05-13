const { authentication, restrictTo } = require('../controllers/authController');
const { signup, login } = require('../controllers/authController');

const router = require('express').Router();

router.route('/signup').post(authentication, restrictTo('0'), signup);
router.route('/login').post(login);

module.exports = router;
