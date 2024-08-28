const Task = require("../models/task")
const Joi = require("joi")

//add a task
//delete task
//edit task
//get tasks by id

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    userId: Joi.string().required(),
})


const addNewTask = async (req,res) => {
    
    const {title,description,userId,priority,status} = req.body

    const {error} = taskSchema.validate({title,description,userId,priority,status});


    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }

    try{
        const newlyCreatedTask = await Task.create({
            title,
            description,
            userId,
            priority,
            status,
        })
        console.log(newlyCreatedTask,"new task");
        
        if(newlyCreatedTask){
            res.status(200).json({
                success : true,
                message : "Task Added Successfully"
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : "something went wrong...please try again later"
            })
        }

    }
    catch(e){
        res.status(500).json({
            success : false,
            message : "something went wrong...please try again later"
        })
    }
}

const getAllTasks = async (req,res) => {
    
    const {id} = req.params
    

    try{
        
        const extractAllTasksById = await Task.find({userId :id})

        if(extractAllTasksById){
            res.status(200).json({
                success : true,
                taskList : extractAllTasksById
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : "something went wrong...please try again later"
            })
        }

    }
    catch(e){
        res.status(500).json({
            success : false,
            message : "something went wrong...please try again later"
        })
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params
    

    try{
        
        const deleteTask = await Task.findByIdAndDelete(id)

        if(deleteTask){
            res.status(200).json({
                success : true,
                message : "Task Deleted Successfully"
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : "something went wrong...please try again later"
            })
        }

    }
    catch(e){
        res.status(500).json({
            success : false,
            message : "something went wrong...please try again later"
        })
    }
}

const updateTask = async (req,res) => {
    const {title, description, status, priority , userId , _id} = req.body

    try{
        
        const updateTask = await Task.findByIdAndUpdate({_id},{title, description, status, priority , userId},{new : true})

        if(updateTask){
            res.status(200).json({
                success : true,
                message : "Task Updated Successfully"
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : "something went wrong...please try again later"
            })
        }

    }
    catch(e){
        res.status(500).json({
            success : false,
            message : "something went wrong...please try again later"
        })
    }
}


module.exports = {addNewTask, getAllTasks, deleteTask , updateTask}