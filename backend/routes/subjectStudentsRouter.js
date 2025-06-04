const { authentication, restrictTo } = require('../controllers/authController');
const { getSubjectStudentsView, getStudentsBySubjectId, getSubjectsByStudentId } = require('../controllers/subjectStudentsController');

const router = require('express').Router();

router.route('/').get(authentication, restrictTo('0'), getSubjectStudentsView);
router.route('/:subjectId').get(authentication, restrictTo('1'), getStudentsBySubjectId);
router.route('/student/:studentId').get(authentication, restrictTo('2'), getSubjectsByStudentId);

module.exports = router;
