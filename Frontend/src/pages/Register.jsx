import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/apiroutes';
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const [values, setvalues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [bool, setbool] = useState(true)
    const [checked, setchecked] = useState(false)

    useEffect(() => {
        if(checked){
            setbool(false)
        }else{
            setbool(true)
        }
    }, [values,checked])


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
            const { username, email, password } = values
            let a = await fetch(registerRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })
            let b = await a.json()
            if (b.status === false) {
                toast.error(b.msg, toastoptions)
            }
            if (b.status === true) {
                navigate("/posts")
            }
        }
        console.log(values)
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error('🦄Password and confirm password should be same ', toastoptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastoptions)
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters", toastoptions)
            return false;
        } else if (email === "") {
            toast.error("Email is required", toastoptions)
            return false;
        }
        return true;
    }


    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleChangeCheck = (e) => {
        setchecked(!checked)
    }




    return (
        <div className='form w-[100vw] h-[100vh] flex justify-center items-center font-[Helvetica] text-white'>
            <form onSubmit={(e) => handleSubmit(e)} className='h-[92%] bg-[#1a143f] w-[35%] px-6 rounded-xl'>
                <div className="sign text-4xl font-bold text-center py-8">Signup</div>
                <div className="inputs flex flex-col gap-9 justify-center items-center">
                    <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="text" placeholder='Username' name="username" id="" />
                    <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="email" placeholder='Email' name="email" id="" />
                    <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="password" placeholder='Password' name="password" id="" />
                    <input className='px-4 py-3 rounded-xl border-[2px] border-[#3d74ab] w-[95%] text-lg bg-transparent placeholder:text-lg' onChange={(e) => handleChange(e)} type="password" placeholder='Confirm Password' name="confirmPassword" id="" />
                    <div className="check flex gap-3">
                        <input onChange={handleChangeCheck} checked={checked} type="checkbox" name="" id="" />
                        <div>I accept to the terms and conditions related to this company</div>
                    </div>
                    <button disabled={bool} className={bool?"bg-[#97a6b1] px-6 py-3 text-lg rounded-xl font-bold w-[95%]":"bg-[#417eb4] px-6 py-3 text-lg rounded-xl font-bold w-[95%]"} type="submit">CREATE USER</button>
                </div>
                <div className='text-lg px-3 py-4'>Already a user?<Link className='text-blue-300 pl-2' to="/login">Login</Link></div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
