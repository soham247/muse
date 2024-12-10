import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBlog() {
    const {id} = useParams()   
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        content: ''
    })

    const handleInputs = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const getDetails = async() => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/${id}`
            )

            if(response.status === 200) {
                setInputs({
                    title: response.data.data?.title,
                    description: response.data.data?.description,
                    content: response.data.data?.content
                })
            }
        } catch (error) {
            toast.error('Failed to get blog details')
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/update/${id}`,
                {
                    title: inputs.title,
                    description: inputs.description,
                    content: inputs.content
                },
                {withCredentials: true}
            )
            
            if(response.status === 200) {
                toast.success('Blog updated successfully')
                navigate(`/blog/${response.data.data?._id}`, {replace: true})
            }
        } catch (error) {
            toast.error('Failed to update blog')
        }
    }

    useEffect(() => {      
        getDetails()
    }, [id])

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className='w-[80%] mx-auto flex flex-col gap-4 mt-5'>
                <input 
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1'
                type="text"
                name='title'
                placeholder='Title'
                value={inputs.title}
                onChange={handleInputs}
                required
                 />

                <input 
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1'
                type="text"
                name='description'
                placeholder='Description'
                value={inputs.description}
                onChange={handleInputs}
                required
                />

                <input 
                className='py-2 px-4 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-1'
                type="text"
                name='content'
                placeholder='Write your blog'
                value={inputs.content}
                onChange={handleInputs}
                required
                />

                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Update</button>
            </form>
        </div>
    )
}

export default UpdateBlog
