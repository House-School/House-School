import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteGrade, updateGrade } from '../features/grades/gradeSlice'
import { getCourses, updateCourse } from '../features/courses/courseSlice'
import { useSelector, useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import '../pages/gradesStyles.css'

function GradeItemEdit({ grade }) {
  var initFormData = {
    course: '',
    coursename: '',
    requirement: '',
    score: '',
    total: '',
    percentageScore: '',
    percentageTotal: '',
  }
  const [gradeData, setGradeData]  = useState(initFormData)
  var { course, coursename, requirement, score , total, percentageScore, percentageTotal } = gradeData

  const { courses } = useSelector(
    (state) => state.courses
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCourses())
  }, [dispatch])

  const editOptions = {
    render: (message, onConfirm, onCancel) => {
      return (
        <>
          <div className='confirmgrade'>
          <h1 className='confirmgrade_h1'> Save changes to grade? </h1>
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
          <h1 className='confirmgrade_h1'> Delete grade? </h1>
          <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
          <button className='confirmgrade_btn' onClick={onCancel}> No </button>
          </div>
        </>
      );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await confirm("Are you sure?", editOptions);
    if (result) {
      percentageScore = (score/total) * percentageTotal 
      for (let i = 0; i < courses.length; i++) { 
        if (grade.coursename == courses[i].text) {
          var totalGrade = courses[i].totalGrade - grade.percentageScore + percentageScore;
          var text = courses[i].text
          var gradeCalc = courses[i].gradeCalc
          dispatch(updateCourse({id: courses[i]._id, courseData: { text,  totalGrade, gradeCalc }}))
        }
      }
      course = grade.course;
      coursename = grade.coursename;
      dispatch(updateGrade( {id: grade._id, gradeData: { course, coursename, requirement, score , total, percentageScore, percentageTotal }} ))
      window.location.reload(false) /*{force reload window}*/
      return;
    }
    console.log("You click No!");
  }

  const onClick = async (e) => {
    e.preventDefault()
    const result = await confirm("Are you sure?", deleteOptions);
    if (result) {
      e.preventDefault()
      percentageScore = (score/total) * percentageTotal
      for (let i = 0; i < courses.length; i++) { 
        if (grade.coursename == courses[i].text) {
          var totalGrade = courses[i].totalGrade - grade.percentageScore;
          var text = courses[i].text
          var gradeCalc = courses[i].gradeCalc
          dispatch(updateCourse({id: courses[i]._id, courseData: { text,  totalGrade, gradeCalc }}))
        }
      }
      dispatch(deleteGrade(grade._id))
      window.location.reload(false) /*{force reload window}*/
    }
  }

  const onChange = (e) => {
      setGradeData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
  }

  return (
    <>
      <section className='grade-form'>
            <label className="grade-h1"> {grade.coursename}: {grade.requirement}  </label>
            <p className="grade-h1"> {grade.score}/{grade.total}</p> 
            <p className="grade-h1"> {grade.percentageScore}% out of {grade.percentageTotal}%</p> 

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='gradesedit-text'
                id='requirement'
                name='requirement'
                value={requirement}
                onChange={onChange}
                placeholder='Enter name of the requirement'
              />  
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                className='form-control'
                id='score'
                name='score'
                value={score}
                onChange={onChange}
                placeholder='Enter Score in Points'
              />
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                className='form-control'
                id='total'
                name='total'
                value={total}
                onChange={onChange}
                placeholder='Enter Total Points'
              />
            </div>
            <div className='form-group'>
              <input
                type='gradesedit-number'
                id='percentageTotal'
                name='percentageTotal'
                value={percentageTotal}
                onChange={onChange}
                placeholder='Enter Percentage Total of Requirement'
              />
            </div>

          <button type='submit' className='addgrade_btn'>
                Edit
          </button>
          <button className='addgrade_btn' onClick ={onClick}>Delete</button>
          <button className='addgrade_btn' onClick={(e) => navigate('/grades/')}>
              Cancel
            </button>
          </form> 
        </section>
    </>
  )
}

export default GradeItemEdit