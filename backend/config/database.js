const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config');

const sequelize = new Sequelize(config[env]);
const sequelizeSecondary = new Sequelize("remove_db", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
});

module.exports =  { sequelize, sequelizeSecondary };
