import React, {useCallback} from "react";
import { useForm  } from "react-hook-form";
import Button  from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteService from '../../conf/config'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Postform ({post}){
   const {register, handleSubmit, watch, setValue,
    control, getValues
   } = useForm({
    defaultValues : {
        title : post?.title || "",
        slug : post?.slug || "",
        content : post.content || "",
        status : post?.status || "active" ,
    }
   })


   const navigate = useNavigate()
   const userData = useSelector((state)=> state.auth.userData)

   const submit = async(data)=> {

      // update post 
      if(post){
         const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null
         if(file){
          appwriteService.deleteFile(post.featuredImage)
         }

         const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage : file ? file.$id : undefined
         })

         if(dbPost){
             navigate(`/post/${dbPost.$id}`)
         }
      }else {
         const file = await appwriteService.uploadFile(data.featuredImage[0])
         if(file){
            const fileid = file.$id
            data.featuredImage = fileid
            const dbPost =  await appwriteService.createPost({...data, userId : userData.$id})


            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
            
         }
      }
   }

   const slugTrasform = useCallback((value)=>{
     if(value && typeof value == "String"){
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g,"-")
     }
   })

   React.useEffect(()=>{
   watch((value,{name})=>{
      if(name === "title"){
      setValue("slug", slugTrasform(value.title),{shouldValidate : true})
      }
   })
   },[watch, slugTrasform, setValue])

   return(
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">


         <div className="w-2/3 px-2">
         <Input
          label = "Title"
          placeholder = "Title"
          className = "mb-4"
          {...register("title", {required : true})}
         />

         <br />

         <Input
           label = "Sulg :"
           placeholder = "Slug"
           className = "mb-4"
           {...register("slug", {required: true})}
           onInput={(e)=>{
            setValue("slug", slugTrasform(e.currentTarget.value), {shouldValidate : true})
           }}
         />

         <RTE
          label= "Content :"
          name = "content"
          control={control}
          defaultValue={getValues("content")}
         />
         </div>

         <div className="w-1/3 px-2">
          <Input
           label = "featured image"
           type = "file"
           className = "mb-4"
           accept = "image/png, image/jpg, image/jpeg"

           {...register("image", {required : true})}

          /> 

          {post && (
            <div>
               <img src={appwriteService.getFilePreview(post.featuredImage)} 
               alt={post.title} className="rounded-lg" />
            </div>
          )}

         </div>
         
         <Select 
          options = {["active", "inactive"]}
          label = "Status"
          className = "mb-4"
          {...register("status", {required:true})}
         />
         
       <Button
       type = "submit"
       bgColor="green"
       className="w-full"
       >
       {post ? "update" : "submit"}  
       </Button>
      </form>
   )
}