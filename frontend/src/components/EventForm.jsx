import { useState, useEffect } from 'react'
import { createEvent } from '../features/events/eventSlice'
import { useSelector, useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
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
          <h1 className='confirmgrade_h1'> Add event? </h1>
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
        course = document.getElementById("dropdown-course");
        course = mongoose.Types.ObjectId(course.value)
        dispatch(createEvent( { course, eventName, deadline }))
        return;
      }
      else {
        window.location.reload(false) /*{force reload window}*/
      }
    }

    return (
        <section className='grade-form'>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
            <select
              id = "dropdown-course"
              onChange={(e) => setFormData({
                ...FormData,
                course: e.target.value,
              })}>
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
         <button type='submit' className='addgrade_btn'>
              Submit
        </button>
        </form>
      </section>
    )
}

export default EventForm