import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseReducer from '../features/courses/courseSlice'
import taskReducer from '../features/tasks/taskSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    tasks: taskReducer,
  },
})