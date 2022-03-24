import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../features/courses/courseSlice'

function CourseForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createCourse({ text }))
    setText('')
  }

  const onAddCourse = () => {
    navigate('/courses')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Course</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit' onClick={onAddCourse}>
            Add Course
          </button>
        </div>
      </form>
    </section>
  )
}

export default CourseForm