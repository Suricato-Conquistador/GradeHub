'use strict'

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SubjectStudentsView = sequelize.define('SubjectStudentsView', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  student_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'subject_students_view',
  timestamps: false
});

SubjectStudentsView.removeAttribute('id');

module.exports = SubjectStudentsView;
