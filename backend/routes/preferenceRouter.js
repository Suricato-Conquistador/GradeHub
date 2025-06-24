const {authentication, restrictTo} = require('../controllers/authController');
const {  createPreference, getAllPreferences, getPreferenceById, updatePreference} = require('../controllers/preferenceController');

const router = require('express').Router();

router.route('/').post(authentication, restrictTo('0'), createPreference);
router.route('/').get(authentication, getAllPreferences);
router.route('/:id').get(authentication, getPreferenceById);
router.route('/:id').patch(authentication, restrictTo('0'), updatePreference);

module.exports = router;