import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import './dashboardStyles.css'
import './sidemenuStyles.css'
import './tasksStyles.css'
import Spinner from '../components/Spinner'
import {getTasks, reset} from '../features/tasks/taskSlice'

function Tasks() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
      (state) => state.tasks
      )

  useEffect(() => {
    if(isError) {
        console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getTasks())

    return () => {
        dispatch(reset)
    }
  }, [user, navigate, isError, message, dispatch])

  const onDashboard = () => {
    navigate('/')
  }

  const onCourses = () => {
    navigate('/courses')
  }

  if(isLoading) {
      return <Spinner />
  }

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-selected'>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item'>Calendar</button>
          <button className='side-menu-item'>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>
      <div className='dashbg'>
        <section className='dash-heading'>
          <h1 className='dash-h1'>Tasks</h1>
        </section>
        
        <TaskForm />

        <section>
            {tasks.length > 0 ? (
                <div className="task">
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} />
                    ))}
                </div>
            ) : (<h3 className="dash-h1">You have not set any tasks</h3>)}
        </section>

      </div> 
      
    </div>
    
    </>
  )
}

export default Tasks

