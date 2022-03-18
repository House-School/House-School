import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './dashboardStyles.css'
import './sidemenuStyles.css'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }
  })

  const onCourses = () => {
    navigate('/courses')
  }

  const onTasks = () => {
    navigate('/tasks')
  }

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-selected'>Dashboard</button>
          <button className='side-menu-item'onClick={onTasks}>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item'>Calendar</button>
          <button className='side-menu-item'>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>
      <div className='dashbg'>
        <section className='dash-heading'>
          <h1 className='dash-h1'>Welcome, {user && user.name}!</h1>
        </section>
      </div> 
    </div>
    
    </>
  )
}

export default Dashboard