import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'
import '../pages/eventsStyles.css'


function EventItem({ event }) {
  const dispatch = useDispatch()

  return (
    <button className='event-btn'>
      <div className='flex-container-eventname'>
        <a className="event-a">{event.eventName} </a>
        <button className='deleteevent' onClick={() => dispatch(deleteEvent(event._id))}>&times;</button>
      </div>
      
      <p className='event-p'>Course: {event.course} </p>
      <p className='event-p'>Date: {event.deadline} </p>
    </button>
  )
}

export default EventItem