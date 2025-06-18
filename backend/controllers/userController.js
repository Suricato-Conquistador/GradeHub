const { Op } = require('sequelize');
const user = require('../db/models/user');
const deletedIds = require('../secondaryDB/models/deletedIds');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: { deletedAt: null },
        attributes: { exclude: ['userType', 'password', 'deletedAt'] },
    });

    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getUsersByRole = catchAsync(async (req, res, next) => {
    const userType = req.params.userType;

    const users = await user.findAndCountAll({
        where: { userType: userType, deletedAt: null },
        attributes: { exclude: ['userType', 'password', 'deletedAt'] },
    });

    if(!users) {
        return next(new AppError("Invalid user type", 400));
    }

    return res.status(200).json({
        status: 'success',
        data: users,
    });
});

const getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await user.findByPk(id, { 
        where: { deletedAt: null }, 
        attributes: { exclude: ['userType', 'password', 'deletedAt'] },
    });

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const getLoggedUser = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    const result = await user.findByPk(id, { 
        where: { deletedAt: null }, 
        attributes: { exclude: ['password', 'deletedAt'] },
    });

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    return res.json({
        status: 'success',
        data: result,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const result = await user.findOne({ where: { id: id, deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    if(body.name) {
        result.name = body.name;
    }

    if(body.email) {
        result.email = body.email;
    }

    if(body.password) {
        const hashPassword = bcrypt.hashSync(body.password, 10);
        result.password = hashPassword;
    }

    const updatedResult = await result.save();

    const resultData = updatedResult.toJSON();

    delete resultData.userType;
    delete resultData.password;
    delete resultData.deletedAt;

    return res.json({
        status: 'success',
        data: resultData,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const result = await user.findOne({ where: { id: id }});
    
    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    result.name = null;
    result.email = null;
    result.userType = null;
    result.userCode = null;
    result.password = null;

    await result.destroy();

    await deletedIds.create({ number: id });

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

const deleteUserBackup = catchAsync(async (req, res, next) => {
    const result = await deletedIds.findAll();

    result.forEach(async(idData) => {
        let userData = await user.findOne({ 
            where: { id: idData.number },
            paranoid: false,
        });

        userData.name = null;
        userData.email = null;
        userData.userType = null;
        userData.userCode = null;
        userData.password = null;

        await userData.save();
        
        await deletedIds.destroy({ where: { id: idData.id }});
    });

    return {
        status: 'success',
        message: 'Database updated successfully',
    };
});

module.exports = { getAllUsers, getLoggedUser, getUsersByRole, getUserById, updateUser, deleteUser, deleteUserBackup };
