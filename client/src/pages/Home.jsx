import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`} className="group">
      <div className="h-full bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1">
        {blog.thumbnail && (
          <div className="relative overflow-hidden aspect-[16/9]">
            <img 
              src={blog.thumbnail} 
              alt={blog.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <User className="w-4 h-4" />
            <span>{blog.author?.fullname}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4" />
            <span>
              {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
            {blog.title}
          </h2>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {blog.description}
          </p>
          
          <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            Read More <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/`,
        { withCredentials: true }
      );

      if (response?.status === 200) {
        setBlogs(response.data?.data);
      }
    } catch (error) {
      setError(error.message);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <PuffLoader color="#3B82F6" />
        <p className="mt-4 text-gray-400">Loading amazing content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Oops! Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => getAllBlogs()} 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Latest Blog Posts
          </h1>
          <p className="text-gray-400">Discover interesting stories and insights</p>
        </div>

        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No blogs found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;