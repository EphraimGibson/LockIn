const sequelize = require('./config/database');
const User = require('./models/User');

/*sequelize.sync({force: true}).then(()=>{
    console.log("Database synced");})
    .catch((error) => {console.error(error.message);});
*/

async function createUser() {
     const newUser = await User.create({
        firstName : 'test',
        lastName : 'test',
        email: 'a@mail.com',
        password : '12345678'

     });
     console.log("Created user", newUser.toJSON());
}

createUser().catch(error=>console.log("failed"));