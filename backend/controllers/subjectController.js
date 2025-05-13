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

    return res.status(201).json({
        status: 'success',
        data: newSubject
    });
});

const getAllSubjects = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const userData = await user.findByPk(userId);
    const userType = userData.userType;

    if(userType === '1') {
        let result = await subject.findAll({ include: user, where: { teacherId: userId } });

        return res.json({
            status: 'success',
            data: result
        });
    } else if(userType === '2') {
        let result = await subject.findAll({ include: user, where: { studentId: userId } });
    
        return res.json({
            status: 'success',
            data: result
        });
    } else {
        let result = await subject.findAll({ include: user });
        
        return res.json({
            status: 'success',
            data: result
        });
    }
});

const getSubjectById = catchAsync(async (req, res, next) => {
    const subjectId = req.params.id;
    const result = await subject.findByPk(subjectId, { include: user });

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

    const result = await subject.findOne({ where: { id: id }});

    if(!result) {
        return next(new AppError("Invalid subject id", 400));
    }

    result.name = body.name;
    result.teacherId = body.teacherId;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteSubject = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    
    const result = await subject.findOne({ where: { id: id } });

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
