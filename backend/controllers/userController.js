const { Op } = require('sequelize');
const user = require('../db/models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
        where: { userType: userType },
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

//Pegar pelo dono da requisição, sem uso de params
const getUserById = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const result = await user.findByPk(userId, { 
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

const updateUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const result = await user.findOne({ where: { id: id, deletedAt: null }});

    if(!result) {
        return next(new AppError("Invalid user id", 400));
    }

    result.name = body.name;
    result.email = body.email;
    //Não há criptografia de senha
    result.password = body.password;

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

const deleteUserBackup = catchAsync(async (req, res, next) => {
    await user.destroy({ where: { deletedAt: { [Op.ne]: null }}});
});

module.exports = { getAllUsers, getUsersByRole, getUserById, updateUser, deleteUser, deleteUserBackup };
