import axios from 'axios'

const API_URL = '/api/grades/'

const createGrade = async (gradeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, gradeData, config)

  return response.data
}

const getGrades = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("cannot get grades -service")
  const response = await axios.get(API_URL, config)

  return response.data
}

const deleteGrade = async (gradeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + gradeId, config)

  return response.data
}

const gradeService = { 
  createGrade,
  getGrades,
  deleteGrade,
}

export default gradeService