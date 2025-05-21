module.exports = {
  up: (queryInterface, Sequelize) => {
    const subjects = [
      {
        name: "História",
        teacherId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Filosofia",
        teacherId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sociologia",
        teacherId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    
    return queryInterface.bulkInsert('subjects', subjects);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};
