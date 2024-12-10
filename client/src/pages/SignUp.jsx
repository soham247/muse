import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'

function SignUp() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs.password !== inputs.confirmPassword) {
            toast.error('Passwords do not match');
            return
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, {
                fullname: inputs.name,
                username: inputs.username,
                password: inputs.password,
                email: inputs.email
            })

            if(response.status === 201) {
                toast.success('Registration successful. Please login');
                navigate('/login')
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            toast.error('Registration failed');
        }        

        setInputs({
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        
    }

    return (
        <div className='h-screen flex justify-center items-center bg-slate-100'>
        <form className='flex flex-col w-screen md:w-1/2 lg:w-1/3 px-3 py-3 shadow-md bg-white rounded-lg'
        onSubmit={handleSubmit}
        >
            <h2 className="text-center text-2xl font-bold leading-tight my-5">Sign up</h2>

            <label htmlFor="name">Name</label>
            <input 
            type="text" 
            id="name" 
            name='name'
            placeholder='Name'
            className='py-2 px-4 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-1'
            required
            value={inputs.name}
            onChange={handleChange}
            />

            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            id="username" 
            name='username'
            placeholder='Username'
            className='py-2 px-4 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-1'
            required
            value={inputs.username}
            onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            id="email" 
            name='email'
            placeholder='Email'
            className='py-2 px-4 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-1'
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
            className='py-2 px-4 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-1'
            required
            value={inputs.password}
            onChange={handleChange}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
            type="password" 
            id="confirmPassword" 
            name='confirmPassword'
            placeholder='Confirm Password' 
            className='py-2 px-4 mt-1 mb-3 border rounded-md focus:outline-none focus:ring-1'
            required
            value={inputs.confirmPassword}
            onChange={handleChange}
            />

            <p className='text-center mb-2'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>

            <button type="submit"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded'
            >Sign Up</button>
        </form>
    </div>
    )
}

export default SignUp
