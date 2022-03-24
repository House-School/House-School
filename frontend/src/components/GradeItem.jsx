import { useSelector, useDispatch } from 'react-redux'
import { deleteGrade } from '../features/grades/gradeSlice'
import { useNavigate } from 'react-router-dom'
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()
  }

  return (
    <button className='grade-btn'>
      <button className='deletegrade' onClick={() => dispatch(deleteGrade(grade._id))}>&times;</button>
      <label className="task-h1">{grade.course}</label> 
      <label className="task-h1">{grade.requirement}</label> 
      <p>{grade.percentageTotal}</p> 
      <p>{grade.percentageScore}</p> 
    </button>
  )
}

export default GradeItem