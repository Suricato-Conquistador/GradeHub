'use strict'

const preferences = require('../db/models/preference');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');


//Criar nova preferência do usuário
const createPreference = catchAsync(async (req, res) => {
    const { name, description, versionId, optional } = req.body;

    if (!name || !versionId) {
        return res.status(400).json({
            status: 'error',
            message: 'Nome e versão são obrigatórios'
        });
    }
    const newPreference = await preferences.create({
        name,
        description,
        versionId,
        optional,
    });
    
    return res.status(201).json({
        status: 'success',
        data: newPreference
    });
})
    

//Buscar preferência por ID
const getPreferenceById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const preference = await preferences.findByPk(id);

    if (!preference) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferência não encontrada'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            preference
        }
    });
});

const getAllPreferences = catchAsync(async (req, res) => {
    const { studentId, type, status } = req.query;

    const whereClause = {};
    
    if (studentId) {
        whereClause.studentId = studentId;
    }
    
    if (type) {
        whereClause.type = type;
    }
    
    if (status) {
        whereClause.status = status;
    }

    const preferencesList = await preferences.findAll({
        where: whereClause
    });

    return res.status(200).json({
        status: 'success',
        data: {
            preferences: preferencesList
        }
    });
});

//Atualizar preferência do usuário
const updatePreference = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { type, studentId, status } = req.body;

    const preference = await preferences.findByPk(id);

    if (!preference) {
        return res.status(404).json({
            status: 'error',
            message: 'Preferência não encontrada'
        });
    }

    const updatedData = {
        type,
        studentId,
        status,
        accepted: status ? new Date() : null,
        rejected: !status ? new Date() : null
    };

    await preference.update(updatedData);

    return res.status(200).json({
        status: 'success',
        data: {
            preference
        }
    });
});

module.exports = {
    createPreference,
    getPreferenceById,
    getAllPreferences,
    updatePreference
};