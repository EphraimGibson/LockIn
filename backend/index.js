const express = require("express");
const cors = require("cors");
const path = require('path');


require('dotenv').config({path: path.resolve(__dirname,'./environment/dev.env')});

const app = express();
const port = process.env.PORT;

const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');
const registerRoute = require('./routes/registerRoute');
const refreshTokenRoute = require('./routes/refresh-tokenRoute');
const docsRoute = require('./routes/docsRoute')
const basicAuth = require('express-basic-auth');
const sequelize = require('./config/database');


sequelize.sync().then(() => {
  app.listen(port, () => console.log('Server running'));
});

app.use(express.json());

app.use("/login", loginRoute);

app.use('/tasks',taskRoute);

app.use('/sign-up',registerRoute);

app.use('/refresh-token',refreshTokenRoute);

app.use('/docs',basicAuth({
    users: { [process.env.DOCS_USER]: process.env.DOCS_PASS },
    challenge: true,
  }),docsRoute);



















app.listen(port, function(){
    console.log(`App is running on localhost:${port}`);
});