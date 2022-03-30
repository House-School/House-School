import { useDispatch } from 'react-redux'
import { deleteGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'


function GradeItem({ grade }) {
  const dispatch = useDispatch()

  return (
    <button className='grade-btn'>
      <button className='deletegrade' onClick={() => dispatch(deleteGrade(grade._id))}>Delete</button>
      <label className="task-h1">Course: {grade.course} </label>
      <p className="task-h1"> Name of Requirement: {grade.requirement} </p> 
      <p>Score:{grade.score}</p> 
      <p>Total:{grade.total}</p> 
      <p>{grade.percentageScore}% out of {grade.percentageTotal}%</p> 
    </button>
  )
}

export default GradeItem