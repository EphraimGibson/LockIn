const { DataTypes } = require('sequelize')
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User',{
    firstName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail : true,
        }
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8,99],
        }
        
    }
})

User.beforeCreate(async (user) => {
    if(user.password){
        const salt = await bcrypt.genSalt(10); //generates a random string to add to the password for security
        user.password = await bcrypt.hash(user.password,salt); // hashes the password + the salt
    }
});

module.exports = User;
