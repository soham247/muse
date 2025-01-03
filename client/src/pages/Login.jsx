import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/store'
import { toast } from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const authenticated = useSelector((state) => state.auth.isLoggedIn)
    useEffect(() => {
        if (authenticated) {
            navigate('/home');
        }
    }, [authenticated, navigate]);

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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
        setLoading(true)
        setError('')
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/login`, 
                {
                    email: inputs.email, 
                    password: inputs.password
                }, {withCredentials: true}
            )
            if(response.status === 200) {
                dispatch(login(response.data?.data.user._id))                
                toast.success('Login successful')
                setLoading(false)
                navigate('/home')
            } else if(response.status === 404) {
                setError("User not found")
            } else if(response.status === 401) {
                setError("Incorrect password")
            } else {
                toast.error('Login failed')
            }
        } catch (error) {
            toast.error('Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center bg-[#1C1B1F] text-white'>
            <form className='flex flex-col w-screen md:w-1/2 lg:w-1/3 px-3 py-5 bg-black/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-sm rounded-xl'
            onSubmit={handleSubmit}
            >
                <h2 className="text-center text-2xl font-bold leading-tight my-5">Sign in to your account</h2>
                {error && <p className='text-red-500 text-center mb-2'>{error}</p>}
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email"
                placeholder='Email'
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1 bg-transparent'
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
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1 bg-transparent'
                required
                value={inputs.password}
                onChange={handleChange}
                />

                <p className="text-center my-3 text-base">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>

                <button type="submit"
                disabled={loading}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded'
                >{loading ? 'Please wait...' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login
