import { useNavigate } from 'react-router-dom'
import './sidemenuStyles.css'
import './rewardsStyles.css'

function Rewards() {
    const navigate = useNavigate()
  
    const onDashboard = () => {
      navigate('/')
    }
  
    const onCourses = () => {
      navigate('/courses')
    }
  
    const onGrades = () => {
      navigate('/grades')
    }
  
    const onCalendar = () => {
      navigate('/events')
    }

    const onTasks = () => {
        navigate('/tasks')
    }

    const onLinking = () => {
        navigate('/accountlinking')
    }
  
    return (
      <>
      <div className='flex-container'>
        <div className='side-menu'>
            <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
            <button className='side-menu-item' onClick={onTasks}>Tasks</button>
            <button className='side-menu-item' onClick={onCourses}>Courses</button>
            <button className='side-menu-item' onClick={onCalendar}>Calendar</button>
            <button className='side-menu-item-above'onClick={onGrades}>Grades</button>
            <button className='side-menu-selected'>Rewards</button>
            <button className='side-menu-item' onClick={onLinking}>Account linking</button>
        </div>

        <div className='rewardsbg'>
            <img src={require('../images/undraw_under_construction_46pa.png')} className="construction"/>
            <a className='constructiontitle'>Under Construction :)</a>
        </div>
        
      </div>    
      </>
    )
  }
  
  export default Rewards