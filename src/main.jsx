import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Protected from './Componants/Authlayout.jsx'
import Signup from './pages/Signup.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Allposts from './pages/Allposts.jsx'
const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element :  (
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      }, 
      {
        path : "/signup",
        element :  (
          <Protected authentication={false}>
           <Signup/>
          </Protected>
        )
      },
      {
        path : "/All-posts",
        element :  (
          <Protected authentication>
           <Allposts/>
          </Protected>
        )
      },
      {
        path : "/add-post",
        element :  (
          <Protected authentication>
           <Addpost/>
          </Protected>
        )
      },
      {
        path : "/edit-post/:slug",
        element :  (
          <Protected authentication>
           <EditPost/>
          </Protected>
        )
      },
      {
        path : "/post/:slug",
        element :  (
          <Protected authentication>
           <Post/>
          </Protected>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
)
