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
      <p>Percentage Total:{grade.percentageTotal}</p> 
      <p>Percentage Score:{grade.percentageScore}</p> 
      <p>Total:{grade.total}</p> 
    </button>
  )
}

export default GradeItem