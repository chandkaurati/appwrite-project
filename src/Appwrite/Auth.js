import conf from "../conf/conf"; 
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
        const userAccount =   await this.account.create(ID.unique(),email,password,name)  
        if(userAccount){
            return this.loginUser({email,password})
        }else{
           return userAccount 
        }
        } catch (error) {
          throw error  
        }
    }
    async loginUser({email,password}){
        try {
          return await this.account.createEmailSession(email,password)  
        } catch (error) {
            throw error 
        }
    }
    async getCurrentUser(){
        try {
            return this.account.get()
        } catch (error) {
          console.log("appwrite service error: unable to get the user: ", error) 
        }

        return null
    }
    async logout(){
        try {
         await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service error: unable to logout the user: ", error) 

        }
    }  
}


// class Authservice {
//     client = new Client()
//     account;

//     constructor(){
//         this.client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
//         this.account(this.client)
//     }

//    async signupUser({email,password}){
//         try {
//          const user = await this.account.create(ID.unique,email,password)
         
//          if(user){
//            return this.loginUser(email,password)
//          }else{
//              return user
//          }

//         } catch (error) {
//           throw error
//         }
//    }

//    async loginUser({email,password}){
//        try {
//          return await this.account.createEmailSession(email,password)
//        } catch (error) {
//           console.log("appwrite ERROR :: login()")
//        }
//    }

//    async getCurrenctUSer(){
//         try {
//           return await this.account.get();
//         } catch (error) {
//          return null
//         }
//    }

//    async logOut(){
//       try {
//         await this.account.deleteSessions()
//       } catch (error) {
//         console.log("appwrite ERROR: in logOut ")
//       }
//    }
// }
 

const authservice = new AuthService()

export default authservice 