'use strict'

const preferencesVersion = require('../db/models/preferenceVersion');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');

//Criar nova versão de preferências
const createPreferenceVersion = catchAsync(async (req, res) => {
    const { version, date } = req.body;

    const newVersion = await preferencesVersion.create({
        version,
        date
    });

    return res.status(201).json({
        status: 'success',
        data: {
            version: newVersion
        }
    });
});



//Buscar todas as versões de preferências com filtros opcionais
const getAllPreferenceVersions = catchAsync(async (req, res) => {
    const { version, date } = req.query;

    const whereClause = {};

    if (version) {
        whereClause.version = {
            [Op.like]: `%${version}%`
        };
    }

    if (date) {
        whereClause.date = date;
    }

    const versions = await preferencesVersion.findAll({
        where: whereClause
    });

    return res.status(200).json({
        status: 'success',
        data: {
            versions
        }
    });
});


//Buscar versão de preferências por ID
const getPreferenceVersionById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const version = await preferencesVersion.findByPk(id);

    if (!version) {
        return res.status(404).json({
            status: 'error',
            message: 'Versão de preferências não encontrada'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            version
        }
    });
});
//Atualizar versão de preferências
const updatePreferenceVersion = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { version, date } = req.body;

    const existingVersion = await preferencesVersion.findByPk(id);

    if (!existingVersion) {
        return res.status(404).json({
            status: 'error',
            message: 'Versão de preferências não encontrada'
        });
    }

    existingVersion.version = version;
    existingVersion.date = date;
    await existingVersion.save();

    return res.status(200).json({
        status: 'success',
        data: {
            version: existingVersion
        }
    });
});


module.exports = {
    createPreferenceVersion,
    getPreferenceVersionById,
    getAllPreferenceVersions,
    updatePreferenceVersion

};