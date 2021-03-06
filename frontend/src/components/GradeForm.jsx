import { useState, useEffect } from 'react'
import { createGrade } from '../features/grades/gradeSlice'
import { getCourses, updateCourse} from '../features/courses/courseSlice'
import { useSelector, useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import '../pages/gradesStyles.css'


function GradeForm() {

    var initFormData = {
      course: '',
      coursename: '',
      requirement: '',
      score: '',
      total: '',
      percentageScore: '',
      percentageTotal: '',
    }
    const [FormData, setFormData] = useState(initFormData)
    const { courses } = useSelector(
      (state) => state.courses
    )

    var { course, coursename, requirement, score , total, percentageScore, percentageTotal } = FormData

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getCourses())
    }, [dispatch])

    const options = {
      render: (message, onConfirm, onCancel) => {
        return (
          <>
          <div className='confirmgrade'>
          <h1 className='confirmgrade_h1'> Add grade? </h1>
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
      window.location.reload(false) /*{force reload window}*/
      if (result) {
        percentageScore = (score/total) * percentageTotal 
        var selected = document.getElementById('dropdown-course');
        coursename = selected.options[selected.selectedIndex].text;

        for (let i = 0; i < courses.length; i++) { 
          if (coursename == courses[i].text) {
            var totalGrade = courses[i].totalGrade + percentageScore;
            var text = courses[i].text
            var gradeCalc = courses[i].gradeCalc;
          }
        }
        if (gradeCalc === "true") {
          dispatch(createGrade( { course, coursename, requirement, score , total, percentageScore, percentageTotal} ))
          dispatch(updateCourse({id: course, courseData: { text,  totalGrade, gradeCalc }}))
        }
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
              value={requirement}
              onChange={(e) => setFormData({
                ...FormData,
                requirement: e.target.value,
              })}
              placeholder='Enter name of the requirement'
            />  
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='score'
              name='score'
              value={score}
              onChange={(e) => setFormData({
                ...FormData,
                score: e.target.value,
              })}
              placeholder='Enter Score Points'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='total'
              name='total'
              value={total}
              onChange={(e) => setFormData({
                ...FormData,
                total: e.target.value,
              })}
              placeholder='Enter Total Points'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              id='percentageTotal'
              name='percentageTotal'
              value={percentageTotal}
              onChange={(e) => setFormData({
                ...FormData,
                percentageTotal: e.target.value,
              })}
              placeholder='Enter Percentage Total of Requirement'
            />
          </div>
         <button type='submit' className='addgrade_btn'>
              Submit
        </button>
        </form>
      </section>
    )
}

export default GradeForm