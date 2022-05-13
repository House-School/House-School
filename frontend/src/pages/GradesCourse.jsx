import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GradeCourse from '../components/GradeCourse'
import './dashboardStyles.css'
import './sidemenuStyles.css'
import './gradesStyles.css'
import {getGrades, reset} from '../features/grades/gradeSlice'

function Grades() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { grades, isError, message } = useSelector(
      (state) => state.grades
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

  const onDashboard = () => {
    navigate('/')
  }

  const onCourses = () => {
    navigate('/courses')
  }

  const onTasks = () => {
    navigate('/tasks')
  }

  const onGrades = () => {
    navigate('/grades')
  }

  const onCalendar = () => {
    navigate('/events')
  }

  const onRewards = () => {
    navigate('/rewards')
  }

  const onLinking = () => {
    navigate('/accountlinking')
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
          <button className='side-menu-item' onClick={onRewards}>Rewards</button>
          <button className='side-menu-item' onClick={onLinking}>Account linking</button>
      </div>
      <div className='gradebg'>
        <section className='grade-heading'>
          <h1 className='grade-h1'>Grades - Add Course</h1>
        </section>

        <section>
            <>
            <div className="flex-container-grades">
                <GradeCourse />
            </div>
            </>
        </section>  
      </div> 
      <button className='backgrade_btn' onClick={onGrades}>Back to Grades - Summary</button>
    </div>
    
    </>
  )
}

export default Grades

