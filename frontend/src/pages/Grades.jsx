import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GradeItem from '../components/GradeItem'
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

  const onAddGrades = () => {
    navigate('/grades/add')
  }

  const onEditGrades = () => {
    navigate('/grades/edit')
  }

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item-above' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-item' onClick={onTasks}>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item'>Calendar</button>
          <button className='side-menu-selected'>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>
      <div className='gradebg'>
        <section className='grade-heading'>
          <h1 className='grade-h1'>Grades</h1>
        </section>

        <section>
            <>
            <div className="flex-container-grades">
                {grades.map((grade) => (
                    <GradeItem key={grade._id} grade={grade} />
                ))}
            </div>
            <div className='flex-container-grades-fadetop'></div>
            <div className='flex-container-grades-fadebottom'></div>
            </>
        </section>

        <section>
          <button className='addgrade_btn' onClick={onAddGrades}> Add Grades </button>
          <button className='addgrade_btn' onClick={onEditGrades}> Edit Grades </button>
        </section>

      </div> 
      
    </div>
    
    </>
  )
}

export default Grades