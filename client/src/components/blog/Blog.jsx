import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'


function Blog() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true)

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
        setLoading(false)
    }

    useEffect(() => {
        getBlog()
    }, [id])

    if(loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <PuffLoader color="#006eff" />
            </div>
        )
    }

    return (
        <div>
            <div className='text-center mt-1 mb-3'>
                
                <h1 className='text-3xl font-bold'>{blog.title}</h1>
                <p className='py-2'>Author: <Link to={`/profile/${blog.author?._id}`} className='text-blue-500'>{blog.author?.fullname}</Link></p>
                <p className='text-sm italic'>last updated: {new Date(blog.updatedAt).toDateString()}</p>
                {
                    blog.thumbnail && 
                    <img src={blog.thumbnail} alt="thumbnail" className='w-[90%] md:w-1/2 mt-1 mx-auto' />
                }
                <p className='mt-9 text-left px-4 md:px-8'>{blog.content}</p>
            </div>
        </div>
    )
}

export default Blog
