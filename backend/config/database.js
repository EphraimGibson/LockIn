const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LockIn','root','123456789',{
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize;