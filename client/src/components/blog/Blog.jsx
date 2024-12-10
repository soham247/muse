import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'


function Blog() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})

    const getBlog = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/${id}`
            )

            if(response.status === 200) {
                setBlog(response.data?.data)
            }
        } catch (error) {
            navigate('*')
        }
    }

    useEffect(() => {
        getBlog()
    }, [id])

    return (
        <div>
            <Navbar />
            <div className='text-center mt-5'>
                <h1 className='text-3xl font-bold'>{blog.title}</h1>
                <p className='py-2'>Author: <Link to={`/profile/${blog.author?._id}`} className='text-blue-500'>{blog.author?.fullname}</Link></p>
                <p className='text-sm italic'>last updated: {new Date(blog.updatedAt).toDateString()}</p>
                <p className='mt-9 text-left px-4'>{blog.content}</p>
            </div>
        </div>
    )
}

export default Blog
