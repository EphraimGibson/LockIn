const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const User = require('./models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

app.use(express.json());

app.post("/login", async function (request, response){
    console.log("request body:", request.body);

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
    console.error("Error during login: ", error.message);
    response.status(500).send("Internal server error")
};
    
});

app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});