import React from 'react'
import { Link } from 'react-router-dom'

function SomethingWentWrong() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold'>Opps! Something went wrong</h1>
            <p>Return to <Link to='/' className='text-blue-500'>Home Page</Link></p>
        </div>
    )
}

export default SomethingWentWrong
