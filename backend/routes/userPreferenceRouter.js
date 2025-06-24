const { authentication, restrictTo } = require("../controllers/authController");
const { postUserPreference, getUserPreferenceById, updateUserPreference, getUserPreferencesByStudentId } = require("../controllers/userPreferenceController");

const router = require("express").Router();

router.route('/').post(authentication, restrictTo('0'), postUserPreference);
router.route('/student/:id').get(authentication, getUserPreferencesByStudentId);
router.route('/:id').get(authentication, getUserPreferenceById);
router.route('/:id').patch(authentication, restrictTo('0'), updateUserPreference);
// router.route('/:id').delete(authentication, restrictTo('0'), deleteUserPreference); // Uncomment if delete functionality is needed

module.exports = router;

