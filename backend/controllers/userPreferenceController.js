
'use strict';

const userPreferences = require('../db/models/userPreferences');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');

// Criar nova preferência do usuário
const createUserPreference = catchAsync(async (req, res) => {
  const { type, studentId, status } = req.body;

  const preferenceData = {
    type,
    studentId,
    status,
    accepted: status ? new Date() : null,
    rejected: !status ? new Date() : null
  };

  const newPreference = await userPreferences.create(preferenceData);

  return res.status(201).json({
    status: 'success',
    data: {
      preference: newPreference
    }
  });
});

// Buscar preferência por ID
const getUserPreferenceById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const preference = await userPreferences.findByPk(id);

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

// Atualizar preferência do usuário
const updateUserPreference = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, studentId, status } = req.body;

  const preference = await userPreferences.findByPk(id);

  if (!preference) {
    return res.status(404).json({
      status: 'error',
      message: 'Preferência não encontrada'
    });
  }

  // Preparar dados para atualização
  const updateData = {};

  if (studentId !== undefined) {
    updateData.studentId = studentId;
  }

  if (status !== undefined) {
    updateData.status = status;
    
    // Atualizar campos de data baseado no status
    if (status) {
      
      if (preference.status !== status) {updateData.accepted = new Date()
      };
      
    } else {
      if (preference.status !== status) {updateData.rejected = new Date()};
    }
  }

  await preference.update(updateData);

  return res.status(200).json({
    status: 'success',
    data: {
      preference
    }
  });
});

// Buscar preferências por ID do estudante
const getUserPreferencesByStudentId = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const preferences = await userPreferences.findAll({
    where: {
      studentId: studentId
    },
    order: [['createdAt', 'DESC']]
  });

  return res.status(200).json({
    status: 'success',
    results: preferences.length,
    data: {
      preferences
    }
  });
});

module.exports = {
  createUserPreference,
  getUserPreferenceById,
  updateUserPreference,
  getUserPreferencesByStudentId
};

