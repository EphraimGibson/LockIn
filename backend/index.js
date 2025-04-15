const express = require("express");
const cors = require("cors");
const router = express.Router();

const app = express();
const port = 3000;

const path = require('path');
const loginRoute = require('./routes/loginRoute');

//require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

app.use(express.json());

app.use("/login", loginRoute);




















app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});