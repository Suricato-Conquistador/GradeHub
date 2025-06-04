const { Op } = require('sequelize');
const grade = require('../db/models/grade');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createGrade = catchAsync(async (req, res, next) => {
    const { body } = req;
    const { id } = req.user;

    const newGrade = await grade.create({
        grade: null,
        subjectId: body.subjectId,
        studentId: id,
    });

    const result = newGrade.toJSON();

    delete result.deletedAt;

    return res.status(201).json({
        status: 'success', 
        data: newGrade
    });
});

const getAllGrades = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    
    const userData = await user.findByPk(id, { where: { deletedAt: null}});
    const userType = userData.userType;

    let result = [];

    if(userType === '1') {
        result = await grade.findAll({ 
            where: { teacherId: id, deletedAt: null },
            attributes: { exclude: ['deletedAt']}
        });
    } else if(userType === '2') {
        result = await grade.findAll({
            where: { studentId: id, deletedAt: null },
            attributes: { exclude: ['deletedAt']}
        });
    } else {
        result = await grade.findAll({
            where: { deletedAt: null },
            attributes: { exclude: ['deletedAt']}
        })
    }
    
    return res.json({
        status: 'success',
        data: result
    });
});

const getGradeById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await grade.findByPk(id, { where: { deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const getGradeByStudent = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await grade.findAndCountAll({ where: { studentId: id, deletedAt: null }});

    return res.json({
        status: 'success',
        data: result,
    });
});

const updateGrade = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const result = await grade.findOne({ where: { id: id, deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    if(body.grade) {
        result.grade = body.grade;
    }

    if(body.subject) {
        result.subject = body.subject;
    }

    if(body.studentId) {
        const result2 = await user.findByPk(body.studentId, { where: { deletedAt: null }});
        
        if(!result2) {
            return next(new AppError("Invalid student id", 400));
        }
    
        result.studentId = body.studentId;
    }

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteGrade = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const studentId = req.user.id;

    const result = await grade.findOne({ where: { id: id, studentId: studentId, deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid grade id", 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = { createGrade, getAllGrades, getGradeById, getGradeByStudent, updateGrade, deleteGrade };
