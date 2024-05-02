import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,RouterProvider,createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/posts",
    element:<App/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
