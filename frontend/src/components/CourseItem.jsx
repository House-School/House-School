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
    <button className='course-btn' onClick={onClick}>
      {course.text}
      {/* <a href="#" className="modal-close">&times;</a> */}
    </button>
  )
}

export default CourseItem