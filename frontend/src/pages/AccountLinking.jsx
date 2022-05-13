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

    const onRewards = () => {
        navigate('/rewards')
    }
  
    return (
      <>
      <div className='flex-container'>
        <div className='side-menu'>
            <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
            <button className='side-menu-item' onClick={onTasks}>Tasks</button>
            <button className='side-menu-item' onClick={onCourses}>Courses</button>
            <button className='side-menu-item' onClick={onCalendar}>Calendar</button>
            <button className='side-menu-item'onClick={onGrades}>Grades</button>
            <button className='side-menu-item-above' onClick={onRewards}>Rewards</button>
            <button className='side-menu-selected'>Account linking</button>
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