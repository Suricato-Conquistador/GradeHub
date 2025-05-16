'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const grade = require('./grade');

const subject = sequelize.define('subjects',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: "name cannot be null",
                },
                notEmpty: {
                    msg: "name cannot be empty",
                },
            },
        },
        teacherId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            validate: {
                  notEmpty: {
                    msg: "teacherId cannot be empty",
                  },
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          deletedAt: {
            type: DataTypes.DATE,
          },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'subjects'
    }
);

subject.hasMany(grade, {foreignKey: 'subjectId'});
grade.belongsTo(subject, {
    foreignKey: 'subjectId',
});

module.exports = subject;
