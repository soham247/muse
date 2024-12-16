import React from 'react'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'

function LandingPage() {

    return (
        <div>
            <div>
                <div className="text-center mt-5 min-h-[70vh] md:min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center items-center">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                        Welcome to Muse
                    </h1>
                    <p className="text-lg lg:text-xl mt-6 text-white max-w-[70%] mx-auto">
                        Explore ideas, share thoughts, and learn together.
                    </p>

                    <Link to='/signup' className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg inset-shadow-sm inset-shadow-white/20 hover:bg-blue-700 duration-300 flex"><span className='mr-2'>Get Started</span><LogIn /></Link>
                </div>
                <section className='sm:flex sm:justify-around items-center py-5 text-center'>
                    <h2 className='text-3xl font-bold'>Find Blogs You Love.</h2>
                    <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto sm:mx-0 mt-5 sm:mt-0">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Technology</h1>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Travel</h1>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Food</h1>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Health</h1>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Education</h1>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-blue-600">Entertainment</h1>
                        </div>
                    </div>
                </section>
                <section className="py-16 text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
                    <div className="flex flex-wrap justify-center gap-8 px-4 max-w-6xl mx-auto">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Engaging Content</h3>
                        <p>Read articles on a variety of topics curated by experts.</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">User-Friendly Design</h3>
                        <p>Navigate easily and find what you're looking for in seconds.</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage
