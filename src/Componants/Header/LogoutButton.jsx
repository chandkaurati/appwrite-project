import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../Appwrite/Auth'
import { logout } from '../../store/authsclice'

function LogoutButton() {
  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    authservice.logOut().then(()=> dispatch(logout()))
  }
  return (
   <button
   className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full '
   onClick={logoutHandler}
   >Log out</button>
  )
}

export default LogoutButton
