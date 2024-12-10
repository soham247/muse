import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'


function LandingPage() {

    return (
        <div>
            <Navbar />
            <div>
                <div className='bg-cover bg-center text-center mt-5'>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your Blog</h1>
                    <p className="text-lg md:text-xl mb-6">Explore ideas, share thoughts, and learn together!</p>
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
                <section className="py-16 bg-gray-100 text-center">
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
