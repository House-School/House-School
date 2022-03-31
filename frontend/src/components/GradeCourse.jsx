import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGrade } from '../features/grades/gradeSlice'
import { useDispatch } from 'react-redux'
import '../pages/gradesStyles.css'


function GradeCourse() {

    var initFormData = {
      course: '',
      requirement: '',
      score: 0,
      total: 0,
      percentageScore: 0,
      percentageTotal: 0,
    }
    const [FormData, setFormData] = useState(initFormData)

    var { course, requirement, score , total, percentageScore, percentageTotal } = FormData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mongoose = require('mongoose');

    const onSubmit = (e) => {
      e.preventDefault()
      percentageScore = (score/total) * percentageTotal 
      dispatch(createGrade( { course, requirement, score , total, percentageScore, percentageTotal} ))
    }

    return (
        <section className='grade-form'>
        <form onSubmit={onSubmit}>
           <div className='form-group'>
            <input
              type='text'
              name='course'
              id='course'
              value={course}
              onChange={(e) => setFormData({
                ...FormData,
                course: e.target.value,
              })}
              placeholder='Enter Course'
            />
          </div>  
         <button type='submit' className='addgrade_btn'>
              Submit
        </button>
        <button className='addgrade_btn' onClick={(e) => navigate('/grades/')}>
              Cancel
        </button>
        </form>
      </section>
    )
}

export default GradeCourse