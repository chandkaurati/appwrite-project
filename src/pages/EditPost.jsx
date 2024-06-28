import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../conf/config'
import Postform from '../Componants/post-form/postform'
import Container from '../Componants/Container/Container'

function EditPost() {
  const [post,  setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    service.getPost(slug).then((post)=> {
       if(post){
         setPost(post)
       }else{
         navigate("/")
       }
    })
  }, [slug, navigate])
  return (
    <div className='py-6'>
     <Container>
     <Postform post={post}/>
     </Container>
    </div>
  )
}

export default EditPost
