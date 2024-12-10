import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import axios from 'axios'
import { login, logout } from '../redux/store'
import { useState } from 'react'

function Navbar() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)

    const verifyAuth = async() => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/user/current-user`,
                {withCredentials: true}
            )
            if(response.status === 200) {
                dispatch(login(response.data?.data))
            }
        } catch (error) {
            dispatch(logout())
        }
    }

    useEffect(() => {
        
        if(!isLoggedIn) {           
            verifyAuth()
        }
    }, [])
    
    return (
        <nav className='w-full flex justify-between px-5 items-center py-3 font-semibold text-md shadow-md'>
            <Link to={isLoggedIn ? '/home' : '/'}><h1 className='text-2xl font-bold text-blue-500'>Muse</h1></Link>
            
            {!isLoggedIn && 
                <ul className='flex gap-3'>
                <li>Pricing</li>
                <li>Explore</li>
                </ul>
            }

            {isLoggedIn && 
                <div>
                    <input 
                    type="text"
                    placeholder='Search'
                    className='px-4 py-2 rounded-lg'

                    />
                    <button>🔍</button>
                </div>
            }

            {!isLoggedIn && 
                <div>
                    <Link to='/login' className='mr-3 hover:text-blue-700'>Sign In</Link>
                    <Link to='/signup' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Get Started</Link>
                </div>
            }

            {
                isLoggedIn && 
                <div>
                    <button className='mr-3 border border-blue-500 px-2 py-1 rounded-2xl' onClick={() => setDropdown(!dropdown)}>{user.username}</button>
                    {dropdown &&
                        <div className='absolute right-3 bg-white px-4 flex flex-col items-center gap-3 rounded-lg'>
                            <Link to={`/profile/${user._id}`} className='mr-3 mt-2 hover:text-blue-700'>Profile</Link>
                            <Link to={'/create-blog'} className='mr-3 hover:text-blue-700'>Create Blog</Link>
                            <LogoutBtn />
                        </div>
                    }
                </div>
            }
        </nav>
    )
}

export default Navbar


