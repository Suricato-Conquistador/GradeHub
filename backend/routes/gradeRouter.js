const { authentication, restrictTo } = require('../controllers/authController');
const { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade, getGradeByStudent } = require('../controllers/gradeController');

const router = require('express').Router();

router.route('/').post(authentication, restrictTo('2'), createGrade);
router.route('/').get(authentication, getAllGrades);
router.route('/:id').get(authentication, getGradeById);
router.route('/student/:id').get(authentication, getGradeByStudent);
router.route('/:id').patch(authentication, restrictTo('1'), updateGrade);
router.route('/:id').delete(authentication, restrictTo('0'), deleteGrade);

module.exports = router;
