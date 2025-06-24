'use strict'
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const preferenceVersion = sequelize.define('preferencesVersion', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
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

},
{
  freezeTableName: true, // Desabilita a pluralização
  modelName: 'preferenceVersion',
}
);

module.exports = preferenceVersion;