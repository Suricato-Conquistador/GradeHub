const { authentication, restrictTo } = require('../controllers/authController');
const { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade } = require('../controllers/gradeController');

const router = require('express').Router();

router.route('/').post(authentication, restrictTo('1'), createGrade);
router.route('/').get(authentication, restrictTo('1'), getAllGrades);
router.route('/:id').get(authentication, getGradeById);
router.route('/:id').patch(authentication, restrictTo('1'), updateGrade);
router.route('/:id').delete(authentication, restrictTo('1'), deleteGrade);

module.exports = router;
