'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('grades',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    grade: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      validate: {
        notNull: {
          msg: "grade cannot be null",
        },
        notEmpty: {
          msg: "grade cannot be empty",
        },
      }
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "subject cannot be null",
        },
        notEmpty: {
          msg: "subject cannot be empty",
        },
      },
    },
    teacherId: {
      allowNull: false,
      type: DataTypes.NUMBER,
      validate: {
        notNull: {
          msg: "teacherId cannot be null",
        },
        notEmpty: {
          msg: "teacherId cannot be empty",
        },
      },
    },
    studentId: {
      allowNull: false,
      type: DataTypes.NUMBER,
      validate: {
        notNull: {
          msg: "studentId cannot be null",
        },
        notEmpty: {
          msg: "studentId cannot be empty",
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
    modelName: 'grades'
  }
);
