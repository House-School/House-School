import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './dashboardStyles.css'
import './sidemenuStyles.css'
import './gradesStyles.css'
import {getGrades, reset} from '../features/grades/gradeSlice'


function Grades() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { grades, isError, message } = useSelector(
      (state) => state.grades
      )

  useEffect(() => {
    if(isError) {
        console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    return () => {
        dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  useEffect(() => {
    dispatch(getGrades())
  }, [dispatch])

  const onDashboard = () => {
    navigate('/')
  }

  const onCourses = () => {
    navigate('/courses')
  }

  const onTasks = () => {
    navigate('/tasks')
  }

  const onAddCourseCalc = () => {
    navigate('/grades/course')
  }

  const onAddGrades = () => {
    navigate('/grades/add')
  }

  const onEditGrades = () => {
    navigate('/grades/edit')
  }

  const onCalendar = () => {
    navigate('/events')
  }

  let coursesGrades = []
  let coursesTotal = []
  let coursesNames = []

  function InitCoursesTotal() { //initializes array of course totals to 0
    for (let i = 0; i < coursesNames.length; i++) { 
      coursesTotal[i] = 0
    }
    return 0
  }

  function IterGradeCourse(arr) { //calculates the total per course
    for (let i = 0; i < coursesNames.length; i++) { 
      if (arr[0] === coursesNames[i]) {
        coursesTotal[i] = coursesTotal[i] + arr[1]
      }
    }
    return 0
  }

  return (
    <>
    <section className='hide'>
      {grades.map((grade) => (
          coursesGrades.push([grade.course,grade.percentageScore]),
          coursesNames.push(grade.course),
          coursesNames = [...new Set(coursesNames)]
      ))}
    </section>
    
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-item' onClick={onTasks}>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item' onClick={onCalendar}>Calendar</button>
          <button className='side-menu-selected'>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>

      <div className='gradebg'>
        <section className='grade-heading'>
          <h1 className='grade-h1'>Grades - Summary</h1>
        </section>

        <section>
          <>
            <div className='flex-container-gradedisplay'>
              <div className='flex-container-gradetitle'>
                <p className='grade-coursename'> Course name </p>
                <p className='grade-total'> Total </p>
              </div>

              <div className='flex-container-gradeitems'>
                <ul>
                  {coursesNames.map((item,index) => (
                      InitCoursesTotal(),
                      <li className = "grade-name-li" key={index}>{item}</li>
                  ))}
                  {coursesGrades.map((item,index) => (
                      IterGradeCourse(item)
                  ))}
                </ul>    
                <ul>
                  {coursesTotal.map((item,index) => (
                      <li className = "grade-total-li" key={index}>{item}</li>
                  ))}
                </ul> 
              </div>  
            </div>

            <div className='flex-container-grades-fadebottom'>
              <section className='bottom-buttons'>
                <button className='addgrade_btn' onClick={onAddCourseCalc}> Add Course </button>
                <button className='addgrade_btn' onClick={onAddGrades}> Add Grades </button>
                <button className='addgrade_btn' onClick={onEditGrades}> Edit/Delete Grades </button>
              </section>
            </div>
        </>
        </section>
      </div>  
    </div>   
  </>
  )
}

export default Grades