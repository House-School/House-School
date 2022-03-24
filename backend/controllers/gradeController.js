const asyncHandler = require('express-async-handler')

const Grade = require('../models/gradeModel')
const User = require('../models/userModel')

// @desc    Get grade
// @route   GET /api/grades
// @access  Private
const getGrades = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const grades = await Grade.find({ user: req.user.id })

  res.status(200).json(grades)
  })

// @desc    Set grade
// @route   POST /api/grades
// @access  Private
const setGrade = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const { course, requirement, percentageTotal, percentageScore } = req.body
  
    const grade = await Grade.create({
      course,
      requirement,
      percentageTotal,
      percentageScore,
      user: req.user.id,
    })

    res.status(200).json(grade)
  })

// @desc    Update grade
// @route   PUT /api/grades/:id
// @access  Private
const updateGrade = asyncHandler(async (req, res) => {
    const grade = await Grade.findById(req.params.id)
  
    if (!grade) {
      res.status(400)
      throw new Error('Grade not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Match user
    if (grade.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedGrade)
  })

// @desc    Delete grade
// @route   DELETE /api/grades/:id
// @access  Private
const deleteGrade = asyncHandler(async (req, res) => {
    const grade = await Grade.findById(req.params.id)
  
    if (!grade) {
      res.status(400)
      throw new Error('Grade not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Match user
    if (grade.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await grade.remove()
  
    res.status(200).json({ id: req.params.id })
  })
  
  module.exports = {
    getGrades,
    setGrade,
    updateGrade,
    deleteGrade,
  }