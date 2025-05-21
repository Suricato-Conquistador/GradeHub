const catchAsync = require('../utils/catchAsync');
const subjectStudentsView = require('../db/models/subjectStudentsView');

const getSubjectStudentsView = catchAsync(async (req, res, next) => {
    const result = await subjectStudentsView.findAll();

    return res.status(200).json({
        status: 'success',
        data: result
    });
});

const getStudentsBySubjectId = catchAsync(async (req, res, next) => {
    const { subjectId } = req.params;
    
    const result = await subjectStudentsView.findAll({
        where: { subject_id: subjectId }
    });

    return res.status.json({
        status: 'success',
        data: result
    });
});

const getSubjectsByStudentId = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;

    const result = await subjectStudentsView.findAll({
        where: { student_id: studentId }
    });

    return res.status.json({
        status: 'success',
        data: result
    });
});

module.exports = { getSubjectStudentsView, getStudentsBySubjectId, getSubjectsByStudentId };
