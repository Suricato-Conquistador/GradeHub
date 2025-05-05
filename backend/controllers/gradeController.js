const grade = require('../db/models/grade');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createGrade = catchAsync(async (req, res, next) => {
    const body = req.body;
    const teacherId = req.user.id;

    const newGrade = await grade.create({
        grade: body.grade,
        subject: body.subject,
        teacherId: teacherId,
        studentId: body.studentId
    });

    return res.status(201).json({
        status: 'success', 
        data: newGrade
    });
});

const getAllGrades = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    let result = await grade.findAll({ include: user, where: {teacherId: userId} });

    if(!result) {
        result = await grade.findAll({ include: user, where: {studentId: userId} });
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const getGradeById = catchAsync(async (req, res, next) => {
    const gradeId = req.params.id;
    const result = await grade.findByPk(gradeId, { include: user });

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const updateGrade = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const teacherId = req.user.id;
    const body = req.body;

    const result = await grade.findOne({ where: { id: id, teacherId: teacherId }});

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    result.grade = body.grade;
    result.subject = body.subject;
    result.teacherId = teacherId;
    
    const result2 = await user.findByPk(result.studentId);
    
    if(!result2) {
        return next(new AppError("Invalid student id", 400));
    }

    result.studentId = body.studentId;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteGrade = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const teacherId = req.user.id;

    const result = await grade.findOne({ where: { id: id, teacherId: teacherId }});

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade };
