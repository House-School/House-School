import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CourseForm from '../components/CourseForm'
import CourseItem from '../components/CourseItem'
import Spinner from '../components/Spinner'
import { getCourses, reset } from '../features/courses/courseSlice'
import './coursesStyles.css'
import './sidemenuStyles.css'

function Courses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getCourses())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onDashboard = () => {
    navigate('/')
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
          <button className='side-menu-item-above' onClick={onTasks}>Tasks</button>
          <button className='side-menu-selected'>Courses</button>
          <button className='side-menu-item' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-item' onClick={onGrades}>Grades</button>
          <button className='side-menu-item' onClick={onRewards}>Rewards</button>
          <button className='side-menu-item' onClick={onLinking}>Account linking</button>
      </div>

      <div className='coursebg'>
        <section className='course-heading'>
          <h1 className='course-h1'>Courses</h1>
        </section>
        
        <section>
          {courses.length > 0 ? (
            <><div className='flex-container-courses'>
                {courses.map((course) => (
                  <CourseItem key={course._id} course={course} />
                ))}
                <a className='createcourse-btn' href="#addcourse-modal">+ Create new course</a>
              </div>

              {/* Based on  https://jsfiddle.net/hP3wu/12/ from answer posted in a Stackoverflow question: 
               https://stackoverflow.com/questions/17044284/css-faded-section-at-top-of-scrolling-div*/}
              <div className='flex-container-courses-fadetop'></div>
              <div className='flex-container-courses-fadebottom'></div>
            </>
          ) : (
            <div className='flex-container-courses'>
              <a className='createcourse-btn' href="#addcourse-modal">+ Create new course</a>
            </div>
          )}
        </section>

        {/* Based on https://codepen.io/denic/pen/ZEbKgPp (by Marko Denic) */}
        <div id="addcourse-modal" className="course-modal">
          <div className="course-modal-content">
              <a className='createcourse-a'>Create new course</a>
              <CourseForm />
              <a href="" className="course-modal-close">&times;</a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Courses