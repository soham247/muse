import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const options = {
        "Current Password": "currentPassword",
        "New Password": "newPassword",
        "Confirm Password": "confirmPassword"
    }
    const [inputs, setInputs] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleInputs = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputs);
        if(inputs.newPassword !== inputs.confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setLoading(true)
        setError('')
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/change-password`,
                {
                    currentPassword: inputs.currentPassword,
                    newPassword: inputs.newPassword
                },
                {withCredentials: true}
            )
            if(response.status === 200) {
                toast.success('Password changed successfully')
                navigate('/home')
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='px-3 py-3 shadow-md bg-primary-600 rounded-lg w-[40%] mx-auto mt-10 flex flex-col'>
                <h1 className='text-3xl font-bold text-center mb-5'>Change Password</h1>
                {Object.entries(options).map(([label, name]) => (
                    <div key={name} className='flex flex-col'>
                        <label htmlFor={name}>{label}</label>
                        <input
                            className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1 bg-transparent text-sm'
                            type="password"
                            name={name}
                            onChange={handleInputs}
                            value={inputs[name]}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            required
                        />
                    </div>
                ))}
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 lg:mx-16 my-3 rounded'>{ loading ? 'Please wait...' : 'Change Password'}</button>
            </form>
        </div>
    )
}

export default ChangePassword
