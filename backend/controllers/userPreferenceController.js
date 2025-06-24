
'use strict';

const userPreferences = require('../db/models/userPreferences');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');

// Criar nova preferência de usuário
const createUserPreference = catchAsync(async (req, res) => {
    const { studentId, preferenceId, date } = req.body;

    const newPreference = await userPreferences.create({
        studentId,
        preferenceId,
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
    const { studentId } = req.params;

    const preferences = await userPreferences.findAll({
        where: {
            studentId
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

// Atualizar preferência de usuário
const updateUserPreference = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { studentId, preferenceId, date } = req.body;

    const existingPreference = await userPreferences.findByPk(id);

    if (!existingPreference) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferência de usuário não encontrada'
        });
    }

    existingPreference.studentId = studentId;
    existingPreference.preferenceId = preferenceId;
    existingPreference.date = date;
    await existingPreference.save();

    return res.status(200).json({
        status: 'success',
        data: {
            preference: existingPreference
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
    createUserPreference,
    getUserPreferencesByStudentId,
    updateUserPreference,
    getUserPreferenceById
};

