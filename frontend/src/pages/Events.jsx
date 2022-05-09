import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EventForm from '../components/EventForm'
import EventItem from '../components/EventItem'
import { getEvents, reset } from '../features/events/eventSlice'
import './eventsStyles.css'
import './sidemenuStyles.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function Events() {
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

  const onEditEvents = () => {
    navigate('/events/edit')
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
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>

      <div className='eventbg'>
        <section className='event-heading'>
          <h1 className='event-h1'>Events</h1>
        </section>

      <button className='addevent_circle'>
        <a className='addbtn' href="#addevent-modal">+</a>
      </button>

      <button className='editevent_btn' onClick={onEditEvents}> Edit Events </button> 
         
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
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              events={{events}}
              />
              </div>     
            </div>
            </>
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