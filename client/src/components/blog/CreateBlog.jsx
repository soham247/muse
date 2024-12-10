import React, { useState } from 'react'
import Navbar from '../Navbar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import Quill from 'quill'
// import 'quill/dist/quill.snow.css';

function CreateBlog() {
    const navigate = useNavigate()
    // const quill = new Quill()
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

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/blogs/create`,
                {
                    title: inputs.title,
                    description: inputs.description,
                    content: inputs.content
                },
                {withCredentials: true}
            )
            if(response.status === 201) {
                toast.success('Blog posted successfully')
                navigate(`/blog/${response.data.data._id}`, {replace: true})
            }
        } catch (error) {
            toast.error('Failed to post blog')
        }
    }

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

                {/* <div id="editor"></div> */}

                <button onClick={handleSubmit} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Post</button>
            </form>
        </div>
    )
}

export default CreateBlog
