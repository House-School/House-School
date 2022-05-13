import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../features/courses/courseSlice'
import { confirm } from "react-confirm-box";
import '../pages/coursesStyles.css'

function CourseForm() {
  var initFormData = {
    text: '',
    totalGrade: '',
    gradeCalc: '',
  }
  const [FormData, setFormData] = useState(initFormData)
  const { courses } = useSelector(
    (state) => state.courses
  )

  var { text, totalGrade, gradeCalc } = FormData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  var totalGrade = 0

  const onSubmit = async (e) => {
    e.preventDefault()
    window.location.href = 'http://localhost:3000/courses'
    dispatch(createCourse({ text, totalGrade, gradeCalc }))
    window.location.reload(false) /*{force reload window}*/
  }

  const onAddCourse = () => {
    navigate('/courses')
  }

  return (
    <section className='course-form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setFormData({
              ...FormData,
              text: e.target.value,
            })}
          />
        </div>
        <div className='form-group'>
          <select
            name='gradeCalc-act'
            id='gradeCalc-act'
            value={gradeCalc}
            placeholder="Activate Grade Calculator?"
            onChange={(e) => setFormData({
              ...FormData,
              gradeCalc: e.target.value,
            })}>
            <option> Activate Grade Calculator? </option>
            <option value={"true"}> Yes </option> 
            <option value={"false"}> No </option> 
          </select>
        </div>
        <div className='flex-container'>
          <button className='btn btn-block' type='submit' onClick={onAddCourse}>
            Confirm
          </button>
          <button className='btn btn-block'>
            <a className='cancelbtn' href=""> Cancel </a>
          </button>
        </div>
      </form>
    </section>
  )
}

export default CourseForm