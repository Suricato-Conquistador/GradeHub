'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');
const grade = require('./grade');

const user = sequelize.define('users', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      allowNull: false,
      type: DataTypes.ENUM('0', '1'),
      validate: {
        notNull: {
          msg: "userType cannot be null",
        },
        notEmpty: {
          msg: "userType cannot be empty",
        },
      }
    },
    RA: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "RA cannot be null",
        },
        notEmpty: {
          msg: "RA cannot be empty",
        },
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
        isEmail: {
          msg: "This is a not valid email",
        }
      },
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
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
    paranoid: true,
    freezeTableName: true,
    modelName: 'users'
  }
);

user.hasMany(grade, {foreignKey: 'teacherId'});
grade.belongsTo(user, {
  foreignKey: 'teacherId',
});

user.hasMany(grade, {foreignKey: 'studentId'});
grade.belongsTo(user, {
  foreignKey: 'studentId',
});

module.exports = user;
