import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, updateCourse } from '../features/courses/courseSlice'
import { getGrades, updateGrade, deleteGrade } from '../features/grades/gradeSlice'
import { getEvents, updateEvent, deleteEvent } from '../features/events/eventSlice'
import { useNavigate } from 'react-router-dom'
import { confirm } from "react-confirm-box";
import { FaEdit } from 'react-icons/fa';
import '../pages/coursesStyles.css'

function CourseItem({ course }) {
  const [courseData, setCourseData] = useState('')
  const {text} = courseData
  const { grades, isError, message } = useSelector(
    (state) => state.grades
    )
  const { events } = useSelector(
    (state) => state.events
  )

  var totalGrade = course.totalGrade;
  var gradeCalc = course.gradeCalc;
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()
    navigate('/'+ course._id)
  }

  useEffect(() => {
    dispatch(getGrades())
  }, [dispatch])

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

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
    
    for (let i = 0; i < grades.length; i++) { 
      if (grades[i].course === course._id) {
        var courseid = grades[i].course;
        var coursename = text;
        var requirement = grades[i].requirement;
        var score = grades[i].score;
        var total = grades[i].total;
        var percentageScore = grades[i].percentageScore;
        var percentageTotal = grades[i].percentageTotal;
        dispatch(updateGrade( {id: grades[i]._id, gradeData: { courseid, coursename, requirement, score , total, percentageScore, percentageTotal }} ))
      }
    }
    for (let i = 0; i < events.length; i++) { 
      if (events[i].course == course._id) {
        var courseid = events[i].course;
        var coursename = text;
        var title = events[i].title;
        var start = events[i].start;
        var end = events[i].end;
        dispatch(updateEvent( {id: events[i]._id, eventData: {courseid, coursename, title, start, end }}))
      }
    }
    dispatch(updateCourse({id: course._id, courseData: { text,  totalGrade, gradeCalc }}))
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
      for (let i = 0; i < grades.length; i++) { 
        if (grades[i].course === course._id) {
          var grade = grades[i]._id;
          dispatch(deleteGrade( grades[i]._id ))
        }
      }
      for (let i = 0; i < events.length; i++) { 
        if (events[i].course == course._id) {
          dispatch(deleteEvent(events[i]._id))
        }
      }
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