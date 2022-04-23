const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        course:[{
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: 'Course',
        }],
        eventName: {
            type: String,
            required: [true, 'Please add event name'],
        },
        deadline: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Event', eventSchema)