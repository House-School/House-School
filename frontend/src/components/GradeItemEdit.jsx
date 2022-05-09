import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { deleteGrade, updateGrade } from '../features/grades/gradeSlice'
import { getCourses} from '../features/courses/courseSlice'
import { useSelector, useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import '../pages/gradesStyles.css'

function GradeItem({ grade }) {
  var initFormData = {
    course: '',
    requirement: '',
    score: '',
    total: '',
    percentageScore: '',
    percentageTotal: '',
  }
  const [gradeData, setGradeData]  = useState(initFormData)
  var { course, requirement, score , total, percentageScore, percentageTotal } = gradeData

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
      dispatch(updateGrade( {id: grade._id, gradeData: { course, requirement, score , total, percentageScore, percentageTotal }} ))
      window.location.reload(false) /*{force reload window}*/
      return;
    }
    console.log("You click No!");
  }

  const onClick = async (e) => {
    e.preventDefault()
    const result = await confirm("Are you sure?", deleteOptions);
    if (result) {
      dispatch(deleteGrade(grade._id))
      return;
    }
    console.log("You click No!");
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
            <label className="grade-h1"> {grade.course}: {grade.requirement}  </label>
            <p className="grade-h1"> {grade.score}/{grade.total}</p> 
            <p className="grade-h1"> {grade.percentageScore}% out of {grade.percentageTotal}%</p> 

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <select
                id = "dropdown-course"
                onChange={(e) => setGradeData({
                  ...gradeData,
                  course: e.target.value,
                })}>
              <option> Select a course </option>
              {courses.map((course) => (
                <option key={course._id} value={course.text}> {course.text} </option>
              ))}
              </select>
            </div> 
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

export default GradeItem