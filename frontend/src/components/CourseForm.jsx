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

  const options = {
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
  };
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await confirm("Are you sure?", options);
    window.location.href = 'http://localhost:3000/courses'
    if (result) {
      dispatch(createCourse({ text }))
      setText('')
      return;
    }
    else {
      window.location.reload(false) /*{force reload window}*/
    }
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