import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {PuffLoader} from 'react-spinners'

function Home() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
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
        setLoading(false)
    }

    useEffect(() => {
        getAllBlogs()
    }, [])

    if(loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <PuffLoader color="#006eff" />
            </div>
        )
    }

    return (
        <div>
            <div className='w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
                { blogs? 
                 blogs.map((blog) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id}>
                        <div className='px-4 pb-3 shadow-md my-4'>
                            {
                                blog.thumbnail && (
                                    <img src={blog.thumbnail} alt={blog.title} className='aspect-[16/9] w-full object-cover' />
                                )
                            }
                            <h1 className='text-2xl font-bold mt-2 text-center'>{blog.title}</h1>
                            <p className='text-sm text-right my-1 mr-3 italic'>by {blog.author?.fullname}</p>
                            <p className='text-white/80 text-center mt-2'>{blog.description}</p>
                            <p className="mt-2 text-right text-xs italic text-white/50">{new Date(blog.createdAt).toLocaleDateString().replaceAll("/", " . ")}</p>

                        </div>
                    </Link>
                 ))
                 : "Something went wrong" }
            </div>
        </div>
    )
}

export default Home
