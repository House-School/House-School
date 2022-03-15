// to-do list
// based on task.js from https://github.com/sk-Jahangeer/todo-mern-app/blob/master/server/models/task.js

const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model("task", taskSchema);

