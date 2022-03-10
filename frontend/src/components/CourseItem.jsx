import { useSelector, useDispatch } from 'react-redux'
import { deleteCourse } from '../features/courses/courseSlice'
import { useNavigate } from 'react-router-dom'

function CourseItem({ course }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()

    navigate('/'+ course._id)
  }

  return (
    <div className='course'>
      <div>{new Date(course.createdAt).toLocaleString('en-US')}</div>
      <button onClick={onClick}>{course.text}</button>
      <button onClick={() => dispatch(deleteCourse(course._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default CourseItem