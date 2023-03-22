import React from 'react'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visiblityIcon from '../assets/svg/visibilityIcon.svg'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }

  const  onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password)
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid User Credentials')
    }

  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Welcome back!
          </p>
        </header>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' placeholder='Email' id='email' onChange={onChange} />
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password'
              id='password' value={password} onChange={onChange} />
            <img src={visiblityIcon} alt='show password' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
          <div className="signInBar">
            <p className='signInText'>
              Sign In
            </p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* {Google OAuth link} */}

        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>

    </>
  )
}

export default SignIn