'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');
const grade = require('./grade');
const subject = require('./subject');
const userPreferences = require('./userPreferences');

const user = sequelize.define('users', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      allowNull: true,
      type: DataTypes.ENUM('0', '1', '2'),
      validate: {
        notEmpty: {
          msg: "userType cannot be empty",
        },
      }
    },
    userCode: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "UserCode cannot be empty",
        },
      },
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "This is a not valid email",
        }
      },
    },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if(this.password.length < 7) {
          throw new AppError("Password length must be greater than 7", 400);
        }
        if(value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError("Password and confirm password must be the same", 400);
        }
      }
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
    modelName: 'users'
  }
);

user.hasMany(subject, {foreignKey: 'teacherId'});
subject.belongsTo(user, {
  foreignKey: 'teacherId',
});

user.hasMany(grade, {foreignKey: 'studentId'});
grade.belongsTo(user, {
  foreignKey: 'studentId',
});

user.hasMany(userPreferences, {foreignKey: 'studentId'});
userPreferences.belongsTo(user, {
  foreignKey: 'studentId',
});

module.exports = user;
