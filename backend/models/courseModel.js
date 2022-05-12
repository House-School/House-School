const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, 'Please add course name'],
        },
        totalGrade: {
            type: Number,
            required: true,
        },
        gradeCalc: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Course', courseSchema)