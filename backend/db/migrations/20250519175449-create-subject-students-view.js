'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE VIEW subject_students_view AS
        SELECT 
          u.id AS student_id,
          u.name AS student_name,
          u."userCode" AS student_code,
          g.grade,
          s.id AS subject_id,
          s.name AS subject_name
        FROM grades g
        JOIN subjects s ON g."subjectId" = s.id
        JOIN users u ON g."studentId" = u.id
        WHERE u."deletedAt" IS null AND s."deletedAt" IS null AND g."deletedAt" IS null;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS subject_students_view`);
  }
};
