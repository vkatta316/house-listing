import React from 'react'
import { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visiblityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] =useState({
    name:'',
    email:'',
    password:''
  })

  const {name, email, password} = formData

  const navigate  = useNavigate()

  const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState ,
      [e.target.id] : e.target.value
    }))

  }

  const onSubmit = async (e) =>{
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser,{
        displayName:name
      })
        

      const formDataCopy = {...formData}
      formDataCopy.timestamp = serverTimestamp()
      delete formDataCopy.password

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something wrong with Registration!!!')
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
          <input type="text" className='nameInput' placeholder='Name' id='name' onChange={onChange}/>
          <input type="email" className='emailInput' placeholder='Email' id='email' onChange={onChange}/>
          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password'
            id='password' value={password} onChange={onChange} />
            <img src={visiblityIcon} alt='show password' className='showPassword' onClick={() => setShowPassword((prevState) => !prevState )} />
          </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
        <div className="signUpBar">
          <p className='signUpText'>
            Sign Up
          </p>
          <button className='signUpButton'>
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
        </form>

        {/* {Google OAuth link} */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
       
      </div>

    </>
  )
}

export default SignUp