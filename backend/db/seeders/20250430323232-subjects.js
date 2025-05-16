module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
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
