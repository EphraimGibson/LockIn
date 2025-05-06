const express = require("express");
const cors = require("cors");
const path = require('path');


require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

const app = express();
const port = process.env.PORT;

const router = express.Router();
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');
const registerRoute = require('./routes/registerRoute');
const refreshTokenRoute = require('./routes/refresh-tokenRoute');


app.use(express.json());

app.use("/login", loginRoute);

app.use('/tasks',taskRoute);

app.use('/sign-up',registerRoute);

app.use('/refresh-token',refreshTokenRoute);



















app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});