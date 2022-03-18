import {useDispatch} from 'react-redux'
import {deleteTask} from '../features/tasks/taskSlice'
import '../pages/dashboardStyles.css'
import '../pages/tasksStyles.css'

function TaskItem({ task }) {
const dispatch = useDispatch()

    return (
        <li>
            <input class="form-check-input" type="checkbox" value=""></input>
            <span class="form-checked-content">
                <label class="task-h1">{task.text}</label>                    
            </span>
        
            <button onClick={() => dispatch(deleteTask(task._id))} className="delete_task">
                X
            </button>
            
        </li>
    )
}

export default TaskItem