const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('users', [{
      userType: "1",
      RA: "1234567890",
      name: "Test Teacher",
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
