import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EventForm from '../components/EventForm'
import EventItemEdit from '../components/EventItemEdit'
import { getEvents, reset } from '../features/events/eventSlice'
import './eventsStyles.css'
import './sidemenuStyles.css'

function EventsEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  )
  const { courses } = useSelector(
    (state) => state.courses
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  const onDashboard = () => {
    navigate('/')
  }

  const onTasks = () => {
    navigate('/tasks')
  }

  const onGrades = () => {
    navigate('/grades')
  }

  const onCourses = () => {
    navigate('/courses')
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
          <button className='side-menu-item-above'onClick={onCourses}>Courses</button>
          <button className='side-menu-selected' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-item' onClick={onGrades}>Grades</button>
          <button className='side-menu-item' onClick={onRewards}>Rewards</button>
          <button className='side-menu-item' onClick={onLinking}>Account linking</button>
      </div>

      <div className='coursebg'>
        <section className='course-heading'>
          <h1 className='course-h1'>Edit Events</h1>
        </section>

        <section>
          <>
            <div className="flex-container-tasks">
                {events.map((event) => (
                    <EventItemEdit key={event._id} event={event} />
                ))}
            </div>
            
            {/* Based on  https://jsfiddle.net/hP3wu/12/ from answer posted in a Stackoverflow question: 
            https://stackoverflow.com/questions/17044284/css-faded-section-at-top-of-scrolling-div  */}
            </>
         </section>
         <button className='backevent_btn' onClick={onCalendar}>Back to Calendar</button>
      </div>  
    </div>  
    </>
  )
}

export default EventsEdit