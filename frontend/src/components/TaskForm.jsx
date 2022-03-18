import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'
import '../pages/tasksStyles.css'


function TaskForm() {
    const [text, setText]  = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createTask({ text }))
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Task</label>
                    <input 
                        type="text" 
                        name="text" 
                        id="text" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter task..."
                    />
                    <button className="addtask_btn" type="submit">
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    )
}

export default TaskForm