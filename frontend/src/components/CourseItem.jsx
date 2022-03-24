import { useSelector, useDispatch } from 'react-redux'
import { deleteCourse } from '../features/courses/courseSlice'
import { useNavigate } from 'react-router-dom'
import '../pages/coursesStyles.css'

function CourseItem({ course }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()

    navigate('/'+ course._id)
  }

  return (
    <button className='course-btn'>
      <button className='deletecourse' onClick={() => dispatch(deleteCourse(course._id))}>&times;</button>
      <a className='course-a' onClick={onClick}>{course.text}</a>
    </button>
  )
}

export default CourseItem