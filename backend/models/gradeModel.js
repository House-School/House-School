const mongoose = require('mongoose')

const gradeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        course: {
            type: String,
            required: [true, 'Please add name of Course'],
        },     
        requirement: {
            type: String,
            required: [true, 'Please add name of requirement'],
        },
        percentageTotal: {
            type: Number,
            required: true
        },
        percentageScore: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Grade', gradeSchema)