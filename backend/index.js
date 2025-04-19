const express = require("express");
const cors = require("cors");
const path = require('path');


require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

const app = express();
const port = process.env.PORT;

const router = express.Router();
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');


app.use(express.json());

app.use("/login", loginRoute);

app.use('/tasks',taskRoute);



















app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});