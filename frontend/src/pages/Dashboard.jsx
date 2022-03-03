import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './dashboardStyles.css'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }
  }, )

  return (
    <>
    <div className='flex-container'>
      <div className='dash-menu'>
          <button className='dash-menu-selected'>Dashboard</button>
          <button className='dash-menu-item'>Tasks</button>
          <button className='dash-menu-item'>Courses</button>
          <button className='dash-menu-item'>Calendar</button>
          <button className='dash-menu-item'>Grades</button>
          <button className='dash-menu-item'>Rewards</button>
          <button className='dash-menu-item'>Account linking</button>
      </div>
      <div className='dashbg'>
        <section className='dash-heading'>
          <h1 className='dash-h1'>Welcome, firstname!</h1>
        </section>
      </div> 
    </div>
    
    </>
  )
}

export default Dashboard