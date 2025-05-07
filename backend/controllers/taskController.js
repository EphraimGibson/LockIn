
const User = require('../models/User');
const Tasks = require("../models/Tasks");
const jwt = require('jsonwebtoken');


const addTask =  async function (req,res) { 
    try{
        const authHeader = req.headers['authorization']; //get the infomration from the authorizstoin header
        const token = authHeader && authHeader.split(' ')[1]; //extract token by splitting at the spaces and taking the secind element in the returned array which is the token

        if (!token){
            return res.status(401).json({error: 'No token provided' })
        }

        const decoded = jwt.verify( token, process.env.ACCESS_SECRET) //decode the token

        const user = await User.findOne({ where: {id : decoded.id }})

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newTask = await Tasks.create({
            Title : req.body.Title,
            Description : req.body.Description,
            Due_Date: req.body.Due_Date,
            Priority_Level : req.body.Priority_Level,
            UserId: user.id
        })
    
        res.status(201).json({message: 'Task Created Succesfully',
            task: newTask // return new task back to fe
        });
    }
    catch(error){
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Invalid or expired token'})
        }
        res.status(500).json({error: `Internal Server Error: ${error.message}` })
    };
};

 async function getTasks(req,res){
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token){
            return res.status(401).json({error: 'No token provided' })
        }

        const decoded = jwt.verify( token, process.env.ACCESS_SECRET );

        const tasks = await Tasks.findAll({where: { UserId : decoded.id }})

        if(tasks){
            return res.status(200).json({ tasks: tasks || [] });
        }

    }
    catch(error){
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Invalid or expired token'})
        }
        res.status(500).json({error: `Internal Server Error: ${error.message}` })
    }

}

async function deleteTask(req,res){
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const taskId = req.params.id;

        if(!token){
            return res.status(401).json({error: 'No token provided' })
        }

        const decoded = jwt.verify( token, process.env.ACCESS_SECRET );

        const task = await Tasks.findOne({
            where: { 
                id : taskId,
                UserId : decoded.id
            }
        })

        if(!task){
            res.status(404).json({error: 'Task not found'})
            return;
        }

        await task.destroy()
        res.status(200).json({message: 'Task deleted successfully'})

    }
    catch(error){
        console.error('Delete task error:', error);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Invalid or expired token'})
        }
        res.status(500).json({error: `Internal Server Error: ${error.message}` })
    }

    
}
module.exports = { addTask, getTasks, deleteTask };