const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')

// @desc    Get event
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const events = await Event.find({ user: req.user.id })

  res.status(200).json(events)
  })

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const { course, title, start, end } = req.body
  
    const event = await Event.create({
      course,
      title,
      start,
      end,
      user: req.user.id,
    })

    res.status(200).json(event)
  })

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
  
    if (!event) {
      res.status(400)
      throw new Error('Event not found')
    }

    if (!req.body) {
      res.status(400)
      throw new Error(req.body)
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Match user
    if (event.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

  
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedEvent)
  })

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
  
    if (!event) {
      res.status(400)
      throw new Error('Event not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Match user
    if (event.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    await event.remove()
  
    res.status(200).json({ id: req.params.id })
  })
  
  module.exports = {
    getEvents,
    setEvent,
    updateEvent,
    deleteEvent,
  }