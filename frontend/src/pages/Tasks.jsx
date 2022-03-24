import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
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

  const onGrades = () => {
    navigate('/grades')
  }

  return (
    <>
    <div className='flex-container'>
      <div className='side-menu'>
          <button className='side-menu-item-above' onClick={onDashboard}>Dashboard</button>
          <button className='side-menu-selected'>Tasks</button>
          <button className='side-menu-item' onClick={onCourses}>Courses</button>
          <button className='side-menu-item'>Calendar</button>
          <button className='side-menu-item'onClick={onGrades}>Grades</button>
          <button className='side-menu-item'>Rewards</button>
          <button className='side-menu-item'>Account linking</button>
      </div>
      <div className='taskbg'>
        <section className='task-heading'>
          <h1 className='task-h1'>Tasks</h1>
        </section>
        
        <TaskForm />

        <section>
            {tasks.length > 0 ? (
              <>
                <div className="flex-container-tasks">
                    {tasks.map((task) => (
                        <TaskItem key={task._id} task={task} />
                    ))}
                </div>
                
                {/* Based on  https://jsfiddle.net/hP3wu/12/ from answer posted in a Stackoverflow question: 
               https://stackoverflow.com/questions/17044284/css-faded-section-at-top-of-scrolling-div*/}
                <div className='flex-container-tasks-fadetop'></div>
                <div className='flex-container-tasks-fadebottom'></div>
              </>
            ) : (<h3 className="task-h1">You have not set any tasks</h3>)}
        </section>
      </div>       
    </div>    
    </>
  )
}

export default Tasks

