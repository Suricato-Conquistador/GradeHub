'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deletedIds', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        number: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deletedIds');
  }
};
