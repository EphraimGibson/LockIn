const express = require("express");
const cors = require("cors");
const path = require('path');


require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

const app = express();
const port = process.env.PORT;

const router = express.Router();
const loginRoute = require('./routes/loginRoute');

const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Tasks = require("./models/Tasks");


app.use(express.json());

app.use("/login", loginRoute);

app.post('/tasks',async (req,res)=>{ 
    try{
        const authHeader = req.headers['authorization']; //get the infomration from the authorizstoin header
        const token = authHeader && authHeader.split(' ')[1]; //extract token by splitting at the spaces and taking the secind element in the returned array which is the token

        if (!token){
            return res.status(401).json({error: 'No token provided' })
        }

        const decoded = jwt.verify( token, process.env.JWT_SECRET) //decode the token

        const user = await User.findOne({ where: {id : decoded.id }})

        await Tasks.create({
            Title : req.body.Title,
            Description : req.body.Description,
            Due_Date: req.body.Due_Date,
            Priority_Level : req.body.Priority_Level,
            UserId: user.id
        })
    
        res.status(201).json({message: 'Task Created Succesfully'});
    }
    catch(error){
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Invalid or expired token'})
        }
        console.error("Error adding tasks to DB: " , error.message)
        res.status(500).send("Internal Server Error:")
    };
});




















app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});