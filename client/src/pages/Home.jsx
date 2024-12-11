import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()
    const getAllBlogs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/`,
                {withCredentials: true}
            )

            if(response?.status === 200) {
                setBlogs(response.data?.data)
            }
        } catch (error) {
            navigate('/')     
        }
    }

    useEffect(() => {
        getAllBlogs()
    }, [])

    return (
        <div>
            <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
                { blogs? 
                 blogs.map((blog) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id}>
                        <div className='p-4 shadow-md my-4'>
                            <h1 className='text-2xl font-bold'>{blog.title}</h1>
                            <p className='text-sm text-right mr-3'>by {blog.author?.fullname}</p>
                            <p>{blog.description}</p>
                        </div>
                    </Link>
                 ))
                 : "Something went wrong" }
            </div>
        </div>
    )
}

export default Home
