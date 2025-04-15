const { DataTypes } =  require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');


const Tasks = sequelize.define('Tasks',{
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Due_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Priority_Level: {
        type: DataTypes.STRING,
        allowNull: true
    },
    UserId: {           //userID from User Model is foreign key 
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

//define associations
User.hasMany(Tasks, { foreignKey: 'UserId' });
Tasks.belongsTo(User, { foreignKey: 'UserId' });

module.exports = Tasks;