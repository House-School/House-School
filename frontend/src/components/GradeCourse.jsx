import { useState } from 'react'
import { createGrade } from '../features/grades/gradeSlice'
import { useDispatch } from 'react-redux'
import { confirm } from "react-confirm-box";
import '../pages/gradesStyles.css'


function GradeCourse() {

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

    const options = {
      render: (message, onConfirm, onCancel) => {
        return (
          <>
          <div className='confirmgrade'>
            <h1 className='confirmgrade_h1'> Confirm course addition? </h1>
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
         <button type='submit' className='addgrade_btn'>
              Submit
        </button>
        </form>
      </section>
    )
}

export default GradeCourse