const {authentication , restrictTo} = require('../controllers/authController');
const { createPreferenceVersion, getAllPreferenceVersions, getPreferenceVersionById, updatePreferenceVersion} = require('../controllers/preferenceVersionController');

const router = require('express').Router();

router.route('/').post(authentication, restrictTo('0'), createPreferenceVersion);
router.route('/').get(authentication, getAllPreferenceVersions);
router.route('/:id').get(authentication, getPreferenceVersionById);
router.route('/:id').patch(authentication, restrictTo('0'), updatePreferenceVersion);

module.exports = router;
