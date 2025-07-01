
'use strict';

const userPreferences = require('../db/models/userPreferences');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const { post } = require('../routes/userPreferenceRouter');

// Criar nova preferência de usuário
const postUserPreference = catchAsync(async (req, res) => {
    const { studentId, preferenceId, status, date } = req.body;

    const newPreference = await userPreferences.create({
        studentId,
        preferenceId,
        status,
        date
    });

    return res.status(201).json({
        status: 'success',
        data: {
            preference: newPreference
        }
    });
});

// Buscar preferências de usuário por ID do estudante
const getUserPreferencesByStudentId = catchAsync(async (req, res) => {
    const { id } = req.params;

    const preferences = await userPreferences.findAll({
        where: {
            studentId:id,
        }
    });

    if (!preferences || preferences.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferências de usuário não encontradas'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            preferences
        }
    });
});

const getUserPreferencesByPreferenceId = catchAsync(async (req, res) => {
    const { id } = req.params;

    const preferences = await userPreferences.findAll({
        where: {
            preferenceId: id,
        }
    });

    if (!preferences || preferences.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferências de usuário não encontradas'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            preferences
        }
    });
});

const getUserPreferencesByStudentIdAndPreferenceId = catchAsync(async (req, res) => {
    const { studentId, preferenceId } = req.query;

    const whereClause = {};

    if (studentId) {
        whereClause.studentId = studentId;
    }

    if (preferenceId) {
        whereClause.preferenceId = preferenceId;
    }

    const preferences = await userPreferences.findAll({
        where: whereClause
    });

    if (!preferences || preferences.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferências de usuário não encontradas'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            preferences
        }
    });
});

// Atualizar preferência de usuário

const updateUserPreference = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status, date } = req.body;

    const preference = await userPreferences.findByPk(id);

    if (!preference) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferência de usuário não encontrada'
        });
    }

    await preference.update({

        status: status,
        date: new Date(date)
    });

    return res.status(200).json({
        status: 'success',
        data: {
            preference
        }
    });
});

// Buscar preferência de usuário por ID
const getUserPreferenceById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const preference = await userPreferences.findByPk(id);

    if (!preference) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferência de usuário não encontrada'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            preference
        }
    });
});




module.exports = {
    postUserPreference,
    getUserPreferencesByStudentId,
    getUserPreferencesByPreferenceId,
    getUserPreferencesByStudentIdAndPreferenceId,  
    updateUserPreference,
    getUserPreferenceById
};

