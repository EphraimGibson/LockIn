const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const User = require('./models/User');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');


app.use(express.json());

app.post("/login", async function (request, response){
    
try{
    const user = await User.findOne({where : { email: request.body.email } });

    if (user &&  await bcrypt.compare(request.body.password, user.password)){
       response.status(200).send("Login successfull");
    }
    else{
        response.status(401).send("Failure to authenticate");
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