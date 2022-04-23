import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCourse, updateCourse } from '../features/courses/courseSlice'
import { useNavigate } from 'react-router-dom'
import { confirm } from "react-confirm-box";
import { FaEdit } from 'react-icons/fa';
import '../pages/coursesStyles.css'

function CourseItem({ course }) {
  const [courseData, setCourseData] = useState('')
  const {text} = courseData
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()

    navigate('/'+ course._id)
  }

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <>
        <div className='confirmgrade'>
        <h1 className='confirmgrade_h1'> Confirm Edit? </h1>
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
      dispatch(updateCourse({id: course._id, courseData: { text }}))
      return;
    }
    else {
      window.location.reload(false) /*{force reload window}*/
    }
  }

  const onChange = (e) => {
    setCourseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
}

  return (
    <>
    <button className='course-btn'>
      <button className='deletecourse' onClick={() => dispatch(deleteCourse(course._id))}>&times;</button>
      <a className='course-a' onClick={onClick}>{course.text}</a>
      <a className='rename-a' href="#editcourse-modal"><FaEdit/></a>
    </button>

    <div id="editcourse-modal" className="course-modal">
          <div className="course-modal-content">
              <a className='createcourse-a'>Rename Course</a>
              <section className='course-form'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    name='text'
                    id='text'
                    value={text}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                <button className='btn btn-block' onSubmit={onSubmit}>Rename</button>
                </div>
              </form>
            </section>
            <a href="" className="course-modal-close">&times;</a>
          </div>
    </div>
    </>
  )
}

export default CourseItem