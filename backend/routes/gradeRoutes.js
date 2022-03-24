const express = require('express')
const router = express.Router()
const {
    getGrades,
    setGrade,
    updateGrade,
    deleteGrade,
} = require('../controllers/gradeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGrades).post(protect, setGrade)
router.route('/:id').delete(protect, deleteGrade).put(protect, updateGrade)

module.exports = router