module.exports = {
  up: (queryInterface, Sequelize) => {
    const grades = [
      {
        grade: 8.0,
        subjectId: 2,
        studentId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    
    return queryInterface.bulkInsert('grades', grades);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grades', null, {});
  }
};
