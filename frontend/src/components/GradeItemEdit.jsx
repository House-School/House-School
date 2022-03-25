import { useDispatch} from 'react-redux'
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
    <div  className="flex-container-grades">
    <div className="grade-modal-content">
    <label className="grade-h1">{grade.course}{grade.requirement}{grade.percentageTotal}{grade.percentageScore}{grade.total}</label> 
    <span class="grade-close-button">&times;</span>
      <section className='grade-form'>
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
                id='percentageTotal'
                name='percentageTotal'
                value={percentageTotal}
                onChange={onChange}
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
              />
            </div>

          <button type='submit' className='reg-btn reg-btn-block'>
                Edit
          </button>

          </form> 
        </section>
        </div>
        </div>
    </>
  )
}

export default GradeItem