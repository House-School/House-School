const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        course:{
            type: String,
            required: true, 
            ref: 'Course',
        },
        coursename:{
            type: String,
            required: true, 
            ref: 'Course',
        },
        title: {
            type: String,
            required: [true, 'Please add event name'],
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Event', eventSchema)