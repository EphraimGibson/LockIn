const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userLogin = async function (request, response){
    try{
        const user = await User.findOne({where : { email: request.body.email } });

        if (user &&  await bcrypt.compare(request.body.password, user.password)){
            const token = jwt.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET,
                { expiresIn: '2h'}
            );
            
        response.status(200).json({ message: "Login successful", token });
        }
        else{
            response.status(401).json({ error: "Failure to authenticate" });
        }

    }
    catch(error){
        response.status(500).send("Internal server error")
    };     
};

module.exports = userLogin;