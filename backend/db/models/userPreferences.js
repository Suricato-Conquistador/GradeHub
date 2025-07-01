'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const userPreferences = sequelize.define('userPreferences', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  preferenceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'preferences',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
});
    
module.exports = userPreferences;