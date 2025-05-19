'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const grade = sequelize.define('grades',
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
        isDecimal: {
          msg: "grade value must be in decimal",
        },
      },
    },
    subjectId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "subject cannot be null",
        },
        notEmpty: {
          msg: "subject cannot be empty",
        },
      },
    },
    studentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    paranoid: true, // Soft delete
    freezeTableName: true, // Desabilita a pluralização
    modelName: 'grades'
  }
);

module.exports = grade;
