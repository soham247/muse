import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { ChevronDown, CircleUser } from 'lucide-react'
import DropdownMenu from './DropdownMenu'

function Navbar() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const user = useSelector(state => state.auth.user)
    const [dropdown, setDropdown] = useState(false)

    const handleMouseEnter = () => setDropdown(true)

    const handleMouseLeave = () => setDropdown(false)

    return (
        <nav className='w-full flex justify-between px-2 md:px-5 items-center py-3 text-md shadow-md'>
            <Link to={isLoggedIn ? '/home' : '/'}><h1 className='text-2xl font-bold text-blue-500'>Muse</h1></Link>

            {isLoggedIn && 
                <div className='flex items-center justify-center gap-1 w-[full] md:w-auto'>
                    <input 
                    type="text"
                    placeholder='Search'
                    className='px-4 py-2 rounded-lg w-[70%] md:w-full bg-primary-500 text-white border border-white/20 outline-none'

                    />
                    <button>🔍</button>
                </div>
            }

            {!isLoggedIn && 
                <div className='flex items-center'>
                    <Link to='/login' className='mr-3 hover:text-blue-700'>Sign In</Link>
                    
                </div>
            }

            {
                isLoggedIn && 
                <div>
                    <div className='hidden lg:block'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                        <div className='hidden lg:flex items-center gap-2 cursor-pointer border border-white rounded-2xl px-2 py-1'>
                            <CircleUser />
                            <p>{user.username}</p>
                            <ChevronDown size={17} />
                        </div>                 
                        {dropdown &&
                            <DropdownMenu userId={user._id} />
                        }
                    </div>

                    <div className='block lg:hidden'>
                        <button onClick={() => setDropdown(!dropdown)} className='flex items-center'><CircleUser /><ChevronDown size={16} /></button>                 
                        {dropdown &&
                            <DropdownMenu userId={user._id} />
                        }
                    </div>
                </div>    
            }
        </nav>
    )
}

export default Navbar


