import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { updateGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  const initFormData = {
    course: '',
    requirement: '',
    percentageTotal: '',
    percentageScore: '',
    total: '',
  }
  const [gradeData, setGradeData]  = useState(initFormData)
  const { course, requirement, percentageTotal, percentageScore, total } = gradeData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateGrade( {id: grade._id, gradeData: {course, requirement, percentageTotal, percentageScore, total}} ))
    window.location.reload(false) /*{force reload window}*/
}

  const onChange = (e) => {
      setGradeData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
  }

  return (
    <>
      <section className='grade-form'>
            <label className="task-h1"> {grade.course} </label>
            <label className="task-h1">- {grade.requirement} </label> 
            <label className="task-h1"> {grade.percentageScore}</label> 
            <label className="task-h1"> /{grade.percentageTotal}</label> 
            <label className="task-h1"> Total: {grade.total}</label> 

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='gradesedi-text'
                name='course'
                id='course'
                value={course}
                onChange={onChange}
                placeholder='Enter Course'
              />
            </div>  
            <div className='form-group'>
              <input
                type='gradesedit-text'
                id='requirement'
                name='requirement'
                value={requirement}
                onChange={onChange}
                placeholder='Enter name of the requirement'
              />  
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                className='form-control'
                id='percentageScore'
                name='percentageScore'
                value={percentageScore}
                onChange={onChange}
                placeholder='Enter Score in Percentage'
              />
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                id='percentageTotal'
                name='percentageTotal'
                value={percentageTotal}
                onChange={onChange}
                placeholder='Enter Percentage Total of Requirement'
              />
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                className='form-control'
                id='total'
                name='total'
                value={total}
                onChange={onChange}
                placeholder='Enter Total'
              />
            </div>

          <button type='submit' className='addgrade_btn'>
                Edit
          </button>
          <button className='addgrade_btn' onClick={(e) => navigate('/grades/')}>
              Cancel
          </button>
          </form> 
        </section>
    </>
  )
}

export default GradeItem