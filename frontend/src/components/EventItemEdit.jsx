import { useState, useEffect } from 'react'
import { updateEvent, deleteEvent } from '../features/events/eventSlice'
import { useSelector, useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import { useNavigate } from 'react-router-dom'
import { getCourses} from '../features/courses/courseSlice'
import '../pages/eventsStyles.css'


function EventItemEdit( {event}) {

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
    const navigate = useNavigate()
    var { course, coursename, title, start, end } = FormData
    const mongoose = require('mongoose');

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getCourses())
    }, [dispatch])

    const options = {
      render: (message, onConfirm, onCancel) => {
        return (
          <>
          <div className='confirmgrade'>
          <h1 className='confirmgrade_h1'> Edit event? </h1>
          <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
          <button className='confirmgrade_btn' onClick={onCancel}> No </button>
          </div>
          </>
        );
      }
    };

    const deleteOptions = {
      render: (message, onConfirm, onCancel) => {
        return (
          <>
          <div className='confirmgrade'>
          <h1 className='confirmgrade_h1'> Delete event? </h1>
          <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
          <button className='confirmgrade_btn' onClick={onCancel}> No </button>
          </div>
          </>
        );
      }
    };
    
    const onSubmit = async (e) => {
      e.preventDefault()
      const result = await confirm("Are you sure?", options);
      if (result) {
        var selected = document.getElementById('dropdown-course');
        coursename = selected.options[selected.selectedIndex].text;
        dispatch(updateEvent( {id: event._id, eventData: {course, coursename, title, start, end }}))
        window.location.reload(false) /*{force reload window}*/
        return;
      }
      else {
        window.location.reload(false) /*{force reload window}*/
      }
    }

    const onDelete = async (e) => {
      e.preventDefault()
      const result = await confirm("Are you sure?", deleteOptions);
      if (result) {
        dispatch(deleteEvent(event._id))
        window.location.reload(false) /*{force reload window}*/
        return;
      }
      else {
        window.location.reload(false) /*{force reload window}*/
      }
    }

    return (
        <>
        <section className='grade-form'>
        <p className='event-p'>Event: {event.title} [{event.coursename}]</p>
        <p className='event-p'>Start: {event.start} </p>
        <p className='event-p'>End: {event.end} </p>
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
         <button type='submit' className='addevent_btn'>
              Submit
        </button>
        <button className='deleteevent_btn' onClick={onDelete}>Delete</button>
        </form>
      </section>
      </>
    )
}

export default EventItemEdit