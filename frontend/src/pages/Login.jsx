import { useState, useEffect, Fragment } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import "./loginStyles.css"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <div className="loginbg">
    <img src={require('../images/undraw_road_to_knowledge_m8s0.png')} className="loginimg"/>
      <section className="login-heading">
        <h1 className='login-h1'>
          <FaSignInAlt /> Login
        </h1>
      </section>

      <section className='login-form'>
        <form onSubmit={onSubmit}>
          <div className='form-group' background-color="#000">
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='login-btn login-btn-block'>
              Sign in
            </button>
          </div>
        </form>
      </section>
      <section className='signup'>
        <h3 className='login-h3'>
          Don't have an account? 
          <a>
            <Link to='/register'>
                Sign up here.
            </Link>
          </a>   
        </h3>
      </section>
    </div>         
    </>
  )
}

export default Login