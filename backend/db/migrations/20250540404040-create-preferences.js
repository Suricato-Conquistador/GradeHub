'use strict';

const { sequelize } = require('../../config/database');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {  
        await queryInterface.createTable('preferences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            versionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'preferencesVersion',
                    key: 'id'
                },
            },
            optional: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
            });
        },
        async down(queryInterface, Sequelize) {
            await queryInterface.dropTable('preferences');
        }
};
