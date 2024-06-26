import React, { useState } from 'react'
import authservice from '../Appwrite/Auth'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { data } from 'autoprefixer'
import {login} from '../store/authsclice'
function Signup() {

    const navigate = useNavigate()
    const [error , setError]  = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data)=>{
        setError("")
        try {
            const userData =  await authservice.createAccount(data)

            if(userData){
              const currentUser =  await authservice.getCurrentUser()
              if(currentUser) dispatch(login({currentUser}))
              navigate("/")
            }
        } catch (error) {
            setError(error.message) 
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default Signup
