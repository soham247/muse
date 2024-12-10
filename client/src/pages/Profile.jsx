import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

function Profile() {
    const {id} = useParams()
    const currentUser = useSelector(state => state.auth.user)    
    const [options, setOptions] = useState(false)
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const getUser = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/user/profile/${id}`,
                {withCredentials: true}
            )

            if(response.status === 200) {
                setUser(response.data?.data)
                if(currentUser?._id === id) {
                    setOptions(true)
                }
            }
        } catch (error) {
            navigate('*', {replace: true})
        }
    }

    const deleteBlog = async(id) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/delete/${id}`,
                {withCredentials: true}
            )

            if(response.status === 200) {
                toast.success('Blog deleted successfully');
                navigate(`/home`)
            }
        } catch (error) {            
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
  
            getUser()
        
    }, [id])

    return (
        <div>
            <Navbar />
            {/* <ProfileCard user={user} options={options} /> */}
            <div className='text-center mt-8'>
            <h1 className='text-3xl font-bold text-blue-700'>{user.fullname}</h1>
            <p>@{user.username}</p>
            <p>joined on {new Date(user.createdAt).toLocaleDateString()}</p>
            <h2 className='text-xl font-semibold my-4'>{user.blogs?.length} Blog{user.blogs?.length > 1 && 's'}</h2>
            <hr className='mx-20 my-10' />
            <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    user.blogs?.map((blog) => (
                        <div className='shadow-md p-4' key={blog._id}>
                            <Link
                            to={`/blog/${blog._id}`}
                            >
                                <div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.description}</p>
                                </div>
                            </Link>
                            {options &&
                                <div className='flex justify-around mt-4 gap-2'>
                                <Link to={`/edit/${blog._id}`} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Edit</Link>
                                <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() =>deleteBlog(blog._id)}>Delete</button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
    )
}

export default Profile
