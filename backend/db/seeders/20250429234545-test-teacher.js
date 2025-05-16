const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const users = [
      {
        userType: "0",
        RA: "1234567890",
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: "1",
        RA: "1111111111",
        name: "Rubens da Costa",
        email: "rubens@gmail.com",
        password: "rubens123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: "1",
        RA: "1111111112",
        name: "Vitor Henrique",
        email: "vitor@gmail.com",
        password: "vitor123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: "2",
        RA: "2222222222",
        name: "João Eduardo",
        email: "joao@gmail.com",
        password: "joao123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userType: "2",
        RA: "2222222223",
        name: "Sandro Roberto",
        email: "sandro@gmail.com",
        password: "sandro123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    
    users.forEach(user => {
      user.password = bcrypt.hashSync(user.password, 10)
    });
    
    return queryInterface.bulkInsert('users', users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
