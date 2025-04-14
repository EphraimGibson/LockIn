const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname,'../environment/dev.env')});

const sequelize = new Sequelize('LockIn',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host : process.env.DB_HOST,
    dialect : 'mysql'
})

module.exports = sequelize;