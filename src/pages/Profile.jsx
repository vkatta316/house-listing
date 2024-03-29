import React from 'react'
import { getAuth, updateProfile } from 'firebase/auth'

import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'


function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })

      }
    } catch (error) {
      toast.error('Unable to Update Details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  /*  useEffect(() =>{
     
     const auth = getAuth()
     setUser(auth.currentUser)
     console.log(auth.currentUser)
   },[]) */


  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'> My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}> Logout </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">
            Personal Details
          </p>
          <p className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <div>
              <input type='text' id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </div>
            <div>
              <input type='email' id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </div>


          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p> Sell or Rent your Home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>
      </main>
    </div>
  )
}

export default Profile