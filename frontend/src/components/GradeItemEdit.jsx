import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteGrade, updateGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  var initFormData = {
    course: '',
    requirement: '',
    score: 0,
    total: 0,
    percentageScore: 0,
    percentageTotal: 0,
  }
  const [gradeData, setGradeData]  = useState(initFormData)
  var { course, requirement, score , total, percentageScore, percentageTotal } = gradeData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    percentageScore = (score/total) * percentageTotal 
    dispatch(updateGrade( {id: grade._id, gradeData: { course, requirement, score , total, percentageScore, percentageTotal }} ))
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
            <label className="grade-h1"> {grade.course}: {grade.requirement}  </label>
            <p className="grade-h1"> {grade.score}/{grade.total}</p> 
            <p className="grade-h1"> {grade.percentageScore}% out of {grade.percentageTotal}%</p> 
            <button className='deletegrade' onClick={() => dispatch(deleteGrade(grade._id))}>Delete</button>

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
                id='score'
                name='score'
                value={score}
                onChange={onChange}
                placeholder='Enter Score in Points'
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
                placeholder='Enter Total Points'
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

          <button type='submit' className='addgrade_btn'>
                Edit
          </button>
          <button className='addgrade_btn' onClick={(e) => navigate('/grades')}>
              Cancel
          </button>
          </form> 
        </section>
    </>
  )
}

export default GradeItem