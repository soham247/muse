import React from 'react'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function DropdownMenu({userId}) {
    return (
        <div className='absolute right-3 bg-transparent backdrop-blur px-4 py-4 flex flex-col items-center gap-3 rounded-lg text-white/80 border border-white/20'>
            <Link to={`/profile/${userId}`} className='mt-2 hover:text-blue-700'>Profile</Link>

            <Link to={'/create-blog'} className='hover:text-blue-700'>Create blog</Link>
            <Link to={'/change-password'} className='hover:text-blue-700'>Change password</Link>
            <LogoutBtn />
        </div>
    )
}

export default DropdownMenu
