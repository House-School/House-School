import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './dashboardStyles.css'
import './sidemenuStyles.css'
import './gradesStyles.css'
import {getGrades, reset} from '../features/grades/gradeSlice'
import { getCourses } from '../features/courses/courseSlice'


function Grades() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { grades, isError, message } = useSelector(
      (state) => state.grades
      )
  const { courses } = useSelector(
    (state) => state.courses
    )

  useEffect(() => {
    if(isError) {
        console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    return () => {
        dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    dispatch(getGrades())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCourses())
  }, [dispatch])

  const onDashboard = () => {
    navigate('/')
  }

  const onCourses = () => {
    navigate('/courses')
  }

  const onTasks = () => {
    navigate('/tasks')
  }

  const onAddGrades = () => {
    navigate('/grades/add')
  }

  const onEditGrades = () => {
    navigate('/grades/edit')
  }

  const onCalendar = () => {
    navigate('/events')
  }

  return (
    <>  
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-item' onClick={onTasks}>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item-above' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-selected'>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>

      <div className='gradebg'>
        <section className='grade-heading'>
          <h1 className='grade-h1'>Grades - Summary</h1>
        </section>

        <section>
          <>
            <div className='flex-container-gradedisplay'>
              <div className='flex-container-gradetitle'>
                <p className='grade-coursename'> Course name </p>
                <p className='grade-total'> Total </p>
              </div>

              <div className='flex-container-gradeitems'>
                <ul>
                  {courses.map((item,index) => (
                      <li className = "grade-name-li" key={index}>{item.text}</li>
                  ))}
                </ul>    
                <ul>
                  {courses.map((item,index) => (
                      <li className = "grade-total-li" key={index}>{item.totalGrade}%</li>
                  ))}
                </ul> 
              </div>  
            </div>

            <div className='flex-container-grades-fadebottom'>
              <section className='bottom-buttons'>
                <button className='addgrade_btn' onClick={onAddGrades}> Add Grades </button>
                <button className='addgrade_btn' onClick={onEditGrades}> Edit/Delete Grades </button>
              </section>
            </div>
        </>
        </section>
      </div>  
    </div>   
  </>
  )
}

export default Grades