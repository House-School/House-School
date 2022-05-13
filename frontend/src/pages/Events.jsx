import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EventForm from '../components/EventForm'
import { getEvents, reset } from '../features/events/eventSlice'
import { getCourses } from '../features/courses/courseSlice'
import './eventsStyles.css'
import './sidemenuStyles.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Swal from 'sweetalert2';

function Events() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isError, message } = useSelector(
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

  useEffect(() => {
    dispatch(getCourses())
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

  const onEditEvents = () => {
    navigate('/events/edit')
  }

  var courseFilter = {course: ''}
  const [filterData, setFilterData] = useState(courseFilter)
  var { course } = filterData

  const filterEvents = events.filter((event) => {
    if (course === "Filter by course") {
      return event
    }

    if (!course) {
      return event
    }

    return event.coursename == course
  })

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-item' onClick={onTasks}>Tasks</button>
          <button className='side-menu-item-above'onClick={onCourses}>Courses</button>
          <button className='side-menu-selected' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-item' onClick={onGrades}>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>

      <div className='eventbg'>
        <section className='event-heading'>
          <h1 className='event-h1'>Events</h1>
        </section>

        <div className='flex-container-filter'>
          <div className='form-group'>
            <select
              id = "dropdown-coursefilter"
              onChange={(e) => setFilterData({
                ...filterData,
                course: e.target.value,
              })}>
            <option> Filter by course </option>
            {courses.map((course) => (
              <option key={course._id} value={course.text}> {course.text} </option>
            ))}
            </select>
          </div>
        </div>

        <section>
          <>
            <div className = "flex-container-events">
              <div className ="calendar">
              <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              showNonCurrentDates = {false}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
              eventClick={function(arg) {
                Swal.fire({
                  title: arg.event.title,
                  html: '<h3>[insert course here]</h3>' +
                        '<p><b>Start: </b>' + arg.event.start + '</p><p>'+ 
                        '<b>End: </b> ' + arg.event.start + '</p>',
                  showCloseButton: true,
                  showConfirmButton: false,
                })
              }}
              events={filterEvents}
              height={400}
              />
              </div>     
            </div>
            </>
        </section>

        <section className='bottom-buttons-event'>
          <button className='event_btn'>
            <a className='addbtn' href="#addevent-modal">+ New Event</a>
          </button>
          <button className='event_btn' onClick={onEditEvents}> Edit Events </button> 
        </section>

        {/* Based on https://codepen.io/denic/pen/ZEbKgPp (by Marko Denic) */}
        <div id="addevent-modal" className="event-modal">
          <div className="event-modal-content">
              <a className='event-a'>Add event</a>
              <EventForm />
              <a href="" className="event-modal-close">&times;</a>
          </div>
        </div>
      </div>    
    </div>  
    </>
  )
}

export default Events
