import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGrade } from '../features/grades/gradeSlice'
import { useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import '../pages/gradesStyles.css'


function GradeForm() {

    var initFormData = {
      course: '',
      requirement: '',
      score: 0,
      total: 0,
      percentageScore: 0,
      percentageTotal: 0,
    }
    const [FormData, setFormData] = useState(initFormData)

    var { course, requirement, score , total, percentageScore, percentageTotal } = FormData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const options = {
      render: (message, onConfirm, onCancel) => {
        return (
          <>
          <div className='confirmgrade'>
          <h1 className='confirmgrade_h1'> Add grade? </h1>
          <button className='confirmgrade_btn' onClick={onConfirm}> Yes </button>
          <button className='confirmgrade_btn' onClick={onCancel}> No </button>
          </div>
          </>
        );
      }
    };
    

    const onSubmit = async (e) => {
      e.preventDefault()
      const result = await confirm("Are you sure?", options);
      window.location.href = 'http://localhost:3000/grades'
      if (result) {
        percentageScore = (score/total) * percentageTotal 
        dispatch(createGrade( { course, requirement, score , total, percentageScore, percentageTotal} ))
        return;
      }
      else {
        window.location.reload(false) /*{force reload window}*/
      }
    }

    return (
        <section className='grade-form'>
        <form onSubmit={onSubmit}>
           <div className='form-group'>
            <input
              type='text'
              name='course'
              id='course'
              value={course}
              onChange={(e) => setFormData({
                ...FormData,
                course: e.target.value,
              })}
              placeholder='Enter Course'
            />
          </div>  
          <div className='form-group'>
            <input
              type='text'
              id='requirement'
              name='requirement'
              value={requirement}
              onChange={(e) => setFormData({
                ...FormData,
                requirement: e.target.value,
              })}
              placeholder='Enter name of the requirement'
            />  
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='score'
              name='score'
              value={score}
              onChange={(e) => setFormData({
                ...FormData,
                score: e.target.value,
              })}
              placeholder='Enter Score Points'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='total'
              name='total'
              value={total}
              onChange={(e) => setFormData({
                ...FormData,
                total: e.target.value,
              })}
              placeholder='Enter Total Points'
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              id='percentageTotal'
              name='percentageTotal'
              value={percentageTotal}
              onChange={(e) => setFormData({
                ...FormData,
                percentageTotal: e.target.value,
              })}
              placeholder='Enter Percentage Total of Requirement'
            />
          </div>
         <button type='submit' className='addgrade_btn'>
              Submit
        </button>
        </form>
      </section>
    )
}

export default GradeForm