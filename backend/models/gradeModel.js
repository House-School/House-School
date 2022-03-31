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
        },
        score: {
            type: Number,
        },
        total: {
            type: Number,
        },
        percentageScore: {
            type: Number,
        },
        percentageTotal: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Grade', gradeSchema)