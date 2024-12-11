import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/store'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { LogOut } from 'lucide-react'

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
                navigate('/', {replace: true})
            }
        } catch (error) {
            toast.error('Logout failed')
        }
    }
    return (
        
        <button className='flex items-center gap-2 text-red-600' onClick={logoutUser}>
            <span>Logout</span>
            <LogOut size={20} />
        </button>
        
    )
}

export default LogoutBtn
