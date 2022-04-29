import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Courses from './pages/Courses'
import Tasks from './pages/Tasks'
import Grades from './pages/Grades'
import GradesCourse from './pages/GradesCourse'
import GradesAdd from './pages/GradesAdd'
import GradesEdit from './pages/GradesEdit'
import Events from './pages/Events'
import EventsEdit from './pages/EventsEdit'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/grades' element={<Grades />} />
            <Route path='/grades/course' element={<GradesCourse />} /> // Route to add Course in Grade Calculator
            <Route path='/grades/add' element={<GradesAdd />} /> // Route to Add Grades
            <Route path='/grades/edit' element={<GradesEdit />} /> // Route to Edit Grades
            <Route path='/events' element={<Events />} />
            <Route path='/events/edit' element={<EventsEdit />} /> // Route to Edit Events
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;