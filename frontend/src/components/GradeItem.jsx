import { useDispatch } from 'react-redux'
import { deleteGrade } from '../features/grades/gradeSlice'
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  const dispatch = useDispatch()

  return (
    <button className='grade-btn'>
      <button className='deletegrade' onClick={() => dispatch(deleteGrade(grade._id))}>&times;</button>
      <label className="task-h1">Course:{grade.course} </label> 
      <label className="task-h1">Requirement:{grade.requirement} </label> 
      <p>Percentage Total:{grade.percentageTotal}</p> 
      <p>Percentage Score:{grade.percentageScore}</p> 
      <p>Total:{grade.Total}</p> 
    </button>
  )
}

export default GradeItem