const { authentication, restrictTo } = require("../controllers/authController");
const { postUserPreference, getUserPreferenceById, updateUserPreference, getUserPreferencesByStudentId, getUserPreferencesByPreferenceId, getUserPreferencesByStudentIdAndPreferenceId } = require("../controllers/userPreferenceController");

const router = require("express").Router();

router.route('/').post( postUserPreference);
router.route('/student/:id').get(authentication, getUserPreferencesByStudentId);
router.route('/:id').get(authentication, getUserPreferenceById);
router.route('/:id').patch(authentication, updateUserPreference);
router.route('/preference/:id').get(authentication, getUserPreferencesByPreferenceId);
router.route('/student/:studentId/preference/:preferenceId').get(authentication, getUserPreferencesByStudentIdAndPreferenceId);

// router.route('/:id').delete(authentication, restrictTo('0'), deleteUserPreference); // Uncomment if delete functionality is needed

module.exports = router;

