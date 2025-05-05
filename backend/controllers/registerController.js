const User = require('../models/User');
const sequelize = require('../config/database');


const registerUser = async (req, res) => {
try{
    await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    res.status(201).json({message: "User registered sucessfully"})
}
catch(error){
    if (error.name === "SequelizeUniqueConstraintError"){
        return res.status(409).json({error: "Email is already registered"})
    }
    res.status(500).json({Error: "Error creating User"})
    console.error(error.message);

}

}

module.exports = registerUser;
