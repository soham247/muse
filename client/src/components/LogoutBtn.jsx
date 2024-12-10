import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/store'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutUser = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
                {},
                {withCredentials: true}
            )
            if(response.status === 200) {
                dispatch(logout())
                toast.success('Logout successful')
                navigate('/')
            }
        } catch (error) {
            toast.error('Logout failed')
        }
    }
    return (
        <button 
        className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
        onClick={logoutUser}
        >Logout</button>
    )
}

export default LogoutBtn
