import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CourseItem from '../components/CourseItem'
import { getCourses, reset as courseReset } from '../features/courses/courseSlice'
import TaskItem from '../components/TaskItem'
import { getTasks, reset as taskReset } from '../features/tasks/taskSlice'
import EventItem from '../components/EventItem'
import { getEvents, reset as eventReset } from '../features/events/eventSlice'
import Spinner from '../components/Spinner'
import './dashboardStyles.css'
import './sidemenuStyles.css'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { courses, courseIsLoading, courseIsError, courseMessage } = useSelector(
    (state) => state.courses
  )
  const { tasks, taskIsLoading, taskIsError, taskMessage } = useSelector(
    (state) => state.tasks
  )
  const { events, eventIsLoading, eventIsError, eventMessage } = useSelector(
    (state) => state.events
  )

  useEffect(() => {
    if (courseIsError) {
      console.log(courseMessage)
    }

    if (taskIsError) {
      console.log(taskMessage)
    }

    if (eventIsError) {
      console.log(eventMessage)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getCourses())
    dispatch(getTasks())
    dispatch(getEvents())

    return () => {
      dispatch(courseReset())
      dispatch(taskReset())
      dispatch(eventReset())
    }
  }, [user, navigate, courseIsError, courseMessage, taskIsError, taskMessage, eventIsError, eventMessage, dispatch])

  if (courseIsLoading) {
    return <Spinner />
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

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-selected'>Dashboard</button>
          <button className='side-menu-item' onClick={onTasks}>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-item' onClick={onGrades}>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>

      <div className='dashbg'>
        <section className='dash-heading'>
          <h1 className='dash-h1'>Welcome, {user && user.name}!</h1>
        </section>

        <section className='flex-container-dash'>
          {/* Courses */}
          <section className='flex-container-dash-courses'>
            <section className='flex-container-dash-subheading'>
              <h2 className='dash-h2'>Courses</h2>
              <a className='dash-a' onClick={onCourses}>View all courses</a>
            </section>
            
            <section className='flex-container-dash-content'>
              {courses.map((course) => (
                <CourseItem key={course._id} course={course} />
              ))}
            </section>
          </section>

          {/* Tasks */}
          <section className='flex-container-dash-tasks'>
            <section className='flex-container-dash-subheading'>
              <h2 className='dash-h2'>Tasks</h2>
              <a className='dash-a' onClick={onTasks}>View all tasks</a>
            </section>

            <section className='flex-container-dash-content'>
              {tasks.map((task) => (
                  <TaskItem key={task._id} task={task} />
              ))}
            </section>
          </section>

          {/* Events */}
          <section className='flex-container-dash-events'>
            <section className='flex-container-dash-subheading'>
              <h2 className='dash-h2'>Events</h2>
              <a className='dash-a' onClick={onCalendar}>View all events</a>
            </section>

            <section className='flex-container-dash-event-content'>

            </section>
          </section>

        </section>

      </div>
    </div>
    
    </>
  )
}

export default Dashboard