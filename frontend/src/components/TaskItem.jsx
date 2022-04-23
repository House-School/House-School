import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {deleteTask, updateTask} from '../features/tasks/taskSlice'
import '../pages/dashboardStyles.css'
import '../pages/tasksStyles.css'

function TaskItem({ task }) {
    const [taskData, setTaskData]  = useState({text: task.text})
    const {text} = taskData

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTask( {id: task._id, taskData} ))
        window.location.reload(false) /*{force reload window}*/
    }

    const onChange = (e) => {
        setTaskData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    return (
        <>     
        <li className='task-li'>
            <div className='task-item'>
                <input className="form-check-input" type="checkbox" value=""></input>
                <span className="form-checked-content">
                    <form onSubmit={onSubmit} className="task-h2">
                        <input 
                            type="tasksedit-text" 
                            name="text"
                            id="text"
                            value={text}
                            onChange={onChange}
                            placeholder="Empty task"
                        />
                    </form>              
                </span>
            </div>
            <button onClick={() => dispatch(deleteTask(task._id))} className="delete_task">&times;</button>   
        </li>
        </>   
    )
}

export default TaskItem