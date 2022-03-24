import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'


function GradeForm() {

    const initFormData = {
      course: '',
      requirement: '',
      percentageTotal: '',
      percentageScore: '',
    }
    const [FormData, setFormData] = useState(initFormData)

    const { course, requirement, percentageTotal, percentageScore } = FormData

    const dispatch = useDispatch()

    const onSubmit = (e) => {
      e.preventDefault()
      dispatch(createGrade( { course, requirement, percentageTotal, percentageScore } ))
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
              id='percentageTotal'
              name='percentageTotal'
              value={percentageTotal}
              onChange={(e) => setFormData({
                ...FormData,
                percentageTotal: e.target.value,
              })}
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
            />
         </div>
         <button type='submit' className='reg-btn reg-btn-block'>
              Submit
        </button>
        </form>
      </section>
    )
}

export default GradeForm