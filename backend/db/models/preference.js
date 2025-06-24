'use strict'
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const userPreferences = require('./userPreferences');
const preferenceVersion = require('./preferenceVersion');


const preferences = sequelize.define('preferences', {  
    id : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    versionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'preferenceVersion',
            key: 'id'
        },
    },
    optional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

preferences.hasMany(userPreferences, { foreignKey: 'preferenceId'});
userPreferences.belongsTo(preferences, { foreignKey: 'preferenceId' });

preferenceVersion.hasMany(preferences, { foreignKey: 'versionId' });
preferences.belongsTo(preferenceVersion, { foreignKey: 'versionId' });





module.exports = preferences;