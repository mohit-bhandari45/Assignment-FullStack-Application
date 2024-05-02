import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/apiroutes';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [values, setvalues] = useState({
    username: "",
    password: "",
  })


  const toastoptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values
      let a = await fetch(loginRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),
      })
      let b = await a.json()
      console.log(b)
      if (b.status === false) {
        toast.error(b.msg, toastoptions)
      }
      if (b.status === true) {
        navigate("/")
      }
    }
  }

  const handleValidation = () => {
    const { username, password } = values;
    if (password === "") {
      toast.error("Email and password is required", toastoptions)
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required", toastoptions)
      return false;
    }
    return true;
  }


  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className='form w-[100vw] h-[100vh] flex flex-col justify-center items-center font-[Helvetica] text-white'>
      <form onSubmit={(e) => handleSubmit(e)} className='h-[70%] bg-[#1a143f] w-[30%] px-6 rounded-xl flex flex-col'>
        <div className="sign text-4xl font-bold text-center py-10">Login</div>
        <div className="inputs flex flex-col gap-9 justify-center items-center">
          <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="text" placeholder='Username' name="username" id="" />
          <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="password" placeholder='Password' name="password" id="" />
          <div className="check flex gap-3">
          </div>
          <button className='bg-[#474eb6] px-6 py-3 text-lg rounded-xl font-bold w-[95%]' type="submit">LOGIN</button>
        </div>
        <div className='text-lg px-3 py-4'>Don't have an account?<Link className='text-blue-300 pl-2' to="/register">Register</Link></div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
