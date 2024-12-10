import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/store'
import { toast } from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        email: '', 
        password: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/login`, 
                {
                    email: inputs.email, 
                    password: inputs.password
                }, {withCredentials: true}
            )
            if(response.status === 200) {
                dispatch(login(response.data?.data.user))
                console.log(response.data?.data.user);
                
                toast.success('Login successful')
                navigate('/home')
            }
        } catch (error) {
            toast.error('Login failed')
        }
    }

    return (
        <div className='h-screen flex justify-center items-center bg-slate-100'>
            <form className='flex flex-col w-screen md:w-1/2 lg:w-1/3 px-3 py-5 shadow-md bg-white'
            onSubmit={handleSubmit}
            >
                <h2 className="text-center text-2xl font-bold leading-tight my-5">Sign in to your account</h2>

                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email"
                placeholder='Email'
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1'
                required
                value={inputs.email}
                onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password" 
                name='password'
                placeholder='Password' 
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1'
                required
                value={inputs.password}
                onChange={handleChange}
                />

                <p className="text-center my-3 text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>

                <button type="submit"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded'
                >Login</button>
            </form>
        </div>
    )
}

export default Login
