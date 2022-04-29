import { useState, useEffect } from 'react'
import { createEvent } from '../features/events/eventSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCourses} from '../features/courses/courseSlice'
import '../pages/eventsStyles.css'


function EventForm() {

    var initFormData = {
        course: '',
        eventName: '',
        deadline: ''
    }
    const [FormData, setFormData] = useState(initFormData)
    const { courses } = useSelector(
      (state) => state.courses
    )

    var { course, eventName, deadline } = FormData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(getCourses())
    }, [dispatch])

    const onSubmit = async (e) => {
      e.preventDefault()
      console.log(course)
      dispatch(createEvent( { course, eventName, deadline }))
    }

    const onAddEvent = () => {
      navigate('/events')
    }

    return (
        <section className='event-form'>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
            <select
              id = "dropdown-course"
              onChange={(e) => setFormData({
                ...FormData,
                course: e.target.value,
              })}>
            <option> Select a course </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}> {course.text} </option>
            ))}
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              id='requirement'
              name='requirement'
              value={eventName}
              onChange={(e) => setFormData({
                ...FormData,
                eventName: e.target.value,
              })}
              placeholder='Enter name of the event'
            />  
          </div>
          <div className='form-group'>
            <input
              type='date'
              className='form-control'
              id='score'
              name='score'
              value={deadline}
              onChange={(e) => setFormData({
                ...FormData,
                deadline: e.target.value,
              })}
              placeholder='Enter Score Points'
            />
          </div>
          <button type='submit' className='addevent_btn' onClick={onAddEvent}>
            Confirm
          </button>
          <button className='addevent_btn'>
            <a className='cancelbtn' href=""> Cancel </a>
          </button>
        </form>
      </section>
    )
}

export default EventForm