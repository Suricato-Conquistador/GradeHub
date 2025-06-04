const subject = require("../db/models/subject");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createSubject = catchAsync(async (req, res, next) => {
    const body = req.body;

    const newSubject = await subject.create({
        name: body.name,
        teacherId: body.teacherId
    });

    const result = newSubject.toJSON();

    delete result.deletedAt;

    return res.status(201).json({
        status: 'success',
        data: result
    });
});

const getAllSubjects = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const userData = await user.findByPk(userId, { where: { deletedAt: null}});
    const userType = userData.userType;

    let result = [];

    if(userType === '1') {
        result = await subject.findAll({ 
            where: { teacherId: userId, deletedAt: null }, 
            attributes: { exclude: ['deletedAt']} 
        });
    } else {
        result = await subject.findAll({ 
            where: { deletedAt: null },
            attributes: { exclude: ['deletedAt']}
        });
    }
    
    return res.json({
        status: 'success',
        data: result
    });
});

const getSubjectById = catchAsync(async (req, res, next) => {
    const subjectId = req.params.id;
    const result = await subject.findByPk(subjectId, { where: { deletedAt: null}});

    if(!result) {
        return next(new AppError("Invalid subject id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const updateSubject = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const result = await subject.findOne({ where: { id: id, deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid subject id", 400));
    }

    if(body.name) {
        result.name = body.name;
    }

    if(body.teacherId) {
        result.teacherId = body.teacherId;
    }

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteSubject = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    
    const result = await subject.findOne({ where: { id: id, deletedAt: null } });

    if(!result) {
        return next(new AppError("Invalid subject id", 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject }
