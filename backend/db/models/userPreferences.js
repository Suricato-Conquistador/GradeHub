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
  type: {
    type: DataTypes.ENUM('0', '1'), // 0: marketing email, 1: feedback   
    allowNull: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  accepted: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejected: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
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