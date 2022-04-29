import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCourse } from '../features/courses/courseSlice'
import { confirm } from "react-confirm-box";
import '../pages/coursesStyles.css'

function CourseForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  {/* const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <>
        <div className='confirmgrade'>
        <h1 className='confirmgrade_h1'> Add Course? </h1>
        <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
        <button className='confirmgrade_btn' onClick={onCancel}> No </button>
        </div>
        </>
      );
    }
  }; */}
  
  const onSubmit = async (e) => {
    e.preventDefault()
    window.location.href = 'http://localhost:3000/courses'
    dispatch(createCourse({ text }))
    setText('')
    window.location.reload(false) /*{force reload window}*/
  }

  const onAddCourse = () => {
    navigate('/courses')
  }

  return (
    <section className='course-form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='flex-container'>
          <button className='btn btn-block' type='submit' onClick={onAddCourse}>
            Confirm
          </button>
          <button className='btn btn-block'>
            <a className='cancelbtn' href=""> Cancel </a>
          </button>
        </div>
      </form>
    </section>
  )
}

export default CourseForm