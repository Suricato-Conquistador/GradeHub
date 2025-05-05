const { Sequelize } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.prototype.ne]: '0',
            },
        },
        attributes: { exclude: ['password'] },
    });
    
    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getUserById = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const result = await user.findByPk(userId, { exclude: ['password'] });

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const result = await user.findOne({ where: { id: id }});

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    result.userType = body.userType;
    result.RA = body.RA;
    result.name = body.name;
    result.email = body.email;
    result.password = body.password;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const result = await user.findOne({ where: { id: id }});
    
    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
