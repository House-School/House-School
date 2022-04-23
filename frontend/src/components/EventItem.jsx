import { useDispatch } from 'react-redux'
import { deleteEvent } from '../features/events/eventSlice'
import '../pages/eventsStyles.css'


function EventItem({ event }) {
  const dispatch = useDispatch()

  return (
    <button className='grade-btn'>
      <label className="task-h1">Course: {event.course} </label>
      <button className='deletegrade' onClick={() => dispatch(deleteEvent(event._id))}>Delete</button>
    </button>
  )
}

export default EventItem