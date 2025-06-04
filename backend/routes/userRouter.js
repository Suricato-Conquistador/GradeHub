const { authentication, restrictTo } = require('../controllers/authController');
const { getAllUsers, getUserById, getLoggedUser, updateUser, deleteUser, getUsersByRole } = require('../controllers/userController');


const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getAllUsers);
router.route('/userType/:userType').get(authentication, restrictTo('0', '1'), getUsersByRole);
router.route('/getLoggedUser').get(authentication, getLoggedUser);
router.route('/:id').get(authentication, getUserById);
router.route('/:id').patch(authentication, updateUser);
router.route('/:id').delete(authentication, deleteUser);
router.route('/').delete(deleteUserBackup); // Remover posteriormente

module.exports = router;
