const { Sequelize } = require('sequelize');

const config = require('./config');

const sequelize = new Sequelize(config.development);
const sequelizeSecondary = new Sequelize(config.secondary);

module.exports =  { sequelize, sequelizeSecondary };
