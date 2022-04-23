import axios from 'axios'

const API_URL = '/api/events/'

const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL, eventData, config)

  return response.data
}

const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + eventId, config)

  return response.data
}

const updateEvent = async (eventId, eventData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.put(API_URL + "/" + eventId, eventData, config)

  return response.data
}

const eventService = { 
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
}

export default eventService