import { useDispatch } from 'react-redux'
import { deleteGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  const dispatch = useDispatch()

  return (
    <button className='grade-btn'>
      <label className="task-h1">Course: {grade.course} </label>
      <label className="task-h1"> - Name of Requirement: {grade.requirement} </label> 
      <button className='deletegrade' onClick={() => dispatch(deleteGrade(grade._id))}>Delete</button>
      <p>Score:{grade.score}</p> 
      <p>Total:{grade.total}</p> 
      <p>Percentage Total:{grade.percentageTotal}</p> 
    </button>
  )
}

export default GradeItem