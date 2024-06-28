import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from "./conf";

export class databaseService{
     client = new Client()
     databases;
     bucket;

     constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
     }

     async getPost(slug){
       try {
       return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
       }catch (error) {
         console.log("Appwrite service Error:: getPost()", error)
         return false
       }
     }

     async getPosts(queris = [Query.equal("status","active")]){
       try {
       return await this.databases.listDocuments(conf.databaseService, conf.appwriteCollectionId, queris)
       } catch (error) {
         console.log("Appwrite service Error:: getPostss()", error)

       }
     }

     async createPost({title, slug, content, featuredImage, status, userId}){
      try {
          return await this.databases.createDocument(
           conf.appwriteDatabaseId,
           conf.appwriteCollectionId,
           {
            title, slug, content, slug, 
            featuredImage, status, userId 
           }
         )
      } catch (error) {
        console.log("Appwrite service Error:: createpost()", error)
        return false
      }
     }

     async updatePost(slug,{title, content, featuredImage, status}){
       try {
       return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteDatabaseId,
        slug,
        {
          title, content, 
          featuredImage, status,  
         }
       )
       } catch (error) {
        console.log("Appwrite service Error:: update()", error)
        return false
       }
     }
     async deletePost(slug){
       try {
         await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
         )
         
         return true
       } catch (error) {
        console.log("Appwrite service Error:: Deletepost()", error)
        return false
       }
     }

    
    //  Storage Service

    async uploadFile(file){
       try {
       return await this.bucket.createFile(
       conf.appwriteBucketId,
       ID.unique(),
       file
       )
       }catch (error) {
       console.log("Appwrite service Error:  uploadFIle()", error)
       }
    }

    async deleteFile(fileId){
       try {
       this.bucket.deleteFile(
       conf.appwriteBucketId,
       fileId
       )
       } catch (error) {
        console.log("Appwrite service Error: deleteFile()", error)
       }
    }

    getFilePreview(fileId){
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,  
      ).href
    }

}


const service =  new databaseService()
export default service
