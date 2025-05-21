const { authentication, restrictTo } = require('../controllers/authController');
const { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } = require('../controllers/subjectController');

const router = require('express').Router();

router.route('/').post(authentication, restrictTo('0'), createSubject);
router.route('/').get(authentication, restrictTo('0', '2'), getAllSubjects);
router.route('/:id').get(authentication, getSubjectById);
router.route('/:id').patch(authentication, restrictTo('0'), updateSubject);
router.route('/:id').delete(authentication, restrictTo('0'), deleteSubject);

module.exports = router;
