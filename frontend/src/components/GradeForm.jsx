import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGrade } from '../features/grades/gradeSlice'
import { useDispatch } from 'react-redux'
import '../pages/gradesStyles.css'


function GradeForm() {

    const initFormData = {
      course: '',
      requirement: '',
      percentageTotal: '',
      percentageScore: '',
      total: '',
    }
    const [FormData, setFormData] = useState(initFormData)

    const { course, requirement, percentageTotal, percentageScore, total } = FormData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
      e.preventDefault()
      dispatch(createGrade( { course, requirement, percentageTotal, percentageScore, total } ))
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
          <div className='form-group'>
            <input
              type='text'
              id='requirement'
              name='requirement'
              value={requirement}
              onChange={(e) => setFormData({
                ...FormData,
                requirement: e.target.value,
              })}
              placeholder='Enter name of the requirement'
            />  
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='percentageScore'
              name='percentageScore'
              value={percentageScore}
              onChange={(e) => setFormData({
                ...FormData,
                percentageScore: e.target.value,
              })}
              placeholder='Enter Score in Percentage'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              id='percentageTotal'
              name='percentageTotal'
              value={percentageTotal}
              onChange={(e) => setFormData({
                ...FormData,
                percentageTotal: e.target.value,
              })}
              placeholder='Enter Percentage Total of Requirement'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='total'
              name='total'
              value={total}
              onChange={(e) => setFormData({
                ...FormData,
                total: e.target.value,
              })}
              placeholder='Enter Total'
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

export default GradeForm