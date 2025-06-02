'use strict';
const { DataTypes } = require('sequelize');
const { sequelizeSecondary } = require('../../config/database');

const deletedId = sequelizeSecondary.define('deletedIds',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    number: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false, // Soft delete
    freezeTableName: true, // Desabilita a pluralização
    modelName: 'deletedIds'
  }
);

module.exports = deletedId;
