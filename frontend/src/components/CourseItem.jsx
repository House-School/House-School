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

  const deleteOptions = {
    render: (message, onConfirm, onCancel) => {
      return (
        <>
        <div className='confirmgrade'>
        <h1 className='confirmgrade_h1'> Delete course? </h1>
        <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
        <button className='confirmgrade_btn' onClick={onCancel}> No </button>
        </div>
        </>
      );
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(updateCourse({id: course._id, courseData: { text }}))
    window.location.reload(false) /*{force reload window}*/
  }

  const onChange = (e) => {
    setCourseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onDelete = async (e) => {
    e.preventDefault()
    const result = await confirm("Are you sure?", deleteOptions);
    if (result) {
      dispatch(deleteCourse(course._id))
      return;
    }
    console.log("You click No!");
  }

  const onCancel = async (e) => {
    e.preventDefault()
    window.location.reload(false) /*{force reload window}*/
  }

  return (
    <>

    <button className='course-btn'>
      <button className='deletecourse' onClick={onDelete}>&times;</button>
      <div className='flex-container-editbtn'>
        <a className='course-a' onClick={onClick}>{course.text}</a>
        <label className='edit-icon'> <FaEdit/> </label>
      </div>
      
    </button>

    <input id="trigger" type="checkbox" class='coursecheckbox'/>
    <div class="box">
      <div className="editform">
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

            <div className='flex-container-rename'>
              <button className='rename-btn btn-block' onSubmit={onSubmit}>Rename</button>
              <button className='rename-btn btn-block' onClick={onCancel}>Cancel</button>
            </div>
          
            </div>
          </form>
        </section>
      </div>
    </div>
    </>
  )
}

export default CourseItem