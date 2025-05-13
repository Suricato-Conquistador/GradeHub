const { authentication, restrictTo } = require('../controllers/authController');
const { getAllUsers, getUserById, updateUser, deleteUser, getUsersByRole } = require('../controllers/userController');

const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getAllUsers);
router.route('/:userType').get(authentication, restrictTo(['0', '1']), getUsersByRole);
router.route('/:id').get(authentication, getUserById);
router.route('/:id').patch(authentication, updateUser);
router.route('/:id').delete(authentication, deleteUser);

module.exports = router;
