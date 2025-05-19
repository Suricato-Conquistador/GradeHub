'use strict'

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SubjectStudentsView = sequelize.define('SubjectStudentsView', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_ra: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'subject_students_view',
  timestamps: false
});

SubjectStudentsView.removeAttribute('id');

module.exports = SubjectStudentsView;
