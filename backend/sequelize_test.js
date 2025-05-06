const { DATEONLY, DATE } = require('sequelize');
const sequelize = require('./config/database');
const User = require('./models/User');



sequelize.sync({alter: true}).then(()=>{
    console.log("Database synced");})
    .catch((error) => {console.error(error.message);});


/*async function createUser() {
     const newUser = await Tasks.create({
        Title : 'Make a todo app',
        Description : 'time mananagement ap by Ephraim must be done',
        Due_Date: new Date('2025-05-20T00:00:00Z'),
        Priority_Level : 'High',
        UserId: 2
     });
     console.log("Created Tasks", newUser.toJSON());
}

createUser().catch(error=>console.log("failed"));*/