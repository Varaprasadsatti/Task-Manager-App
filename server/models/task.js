const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title : String,
    description : String,
    userId : String,
    status : String,
    priority : String,
})

const Task = mongoose.models.Task || mongoose.model("Task",TaskSchema);

module.exports = Task;