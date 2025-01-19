import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/store'
import { toast } from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'

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
        <div className='min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
            <div className="w-full max-w-md p-8">
                <form 
                    className='w-full space-y-6 bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black p-8 shadow-lg rounded-lg'
                    onSubmit={handleSubmit}
                >
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Welcome back
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Sign in to your account
                        </p>
                    </div>

                    {error && (
                        <div className='p-3 text-sm text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-lg'>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder='Enter your email'
                                    className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent
                                    placeholder:text-gray-500 dark:placeholder:text-gray-400'
                                    required
                                    value={inputs.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name='password'
                                    placeholder='Enter your password' 
                                    className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent
                                    placeholder:text-gray-500 dark:placeholder:text-gray-400'
                                    required
                                    value={inputs.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className='w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 
                            text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200
                            disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Please wait...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login