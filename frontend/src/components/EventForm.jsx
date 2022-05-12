import { useState, useEffect } from 'react'
import { createEvent } from '../features/events/eventSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCourses} from '../features/courses/courseSlice'
import '../pages/eventsStyles.css'


function EventForm() {

    var initFormData = {
        course: '',
        coursename: '',
        title: '',
        start: '',
        end: '',
    }
    const [FormData, setFormData] = useState(initFormData)
    const { courses } = useSelector(
      (state) => state.courses
    )

    var { course, coursename, title, start, end } = FormData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(getCourses())
    }, [dispatch])

    const onSubmit = async (e) => {
      e.preventDefault()
      var selected = document.getElementById('dropdown-course');
      coursename = selected.options[selected.selectedIndex].text;
      dispatch(createEvent( {course, coursename, title, start, end }))
      window.location.reload(false) /*{force reload window}*/
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
              id='title'
              name='title'
              value={title}
              onChange={(e) => setFormData({
                ...FormData,
                title: e.target.value,
              })}
              placeholder='Enter name of the event'
            />  
          </div>
          <div className='form-group'>
            <input
              type='datetime-local'
              className='form-control'
              id='start'
              name='start'
              value={start}
              onChange={(e) => setFormData({
                ...FormData,
                start: e.target.value,
              })}
            />
          </div>
          <div className='form-group'>
            <input
              type='datetime-local'
              className='form-control'
              id='end'
              name='end'
              value={end}
              onChange={(e) => setFormData({
                ...FormData,
                end: e.target.value,
              })}
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