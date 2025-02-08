import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

function Error404() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="mb-8 relative"
        >
          <AlertCircle className="w-20 h-20 text-blue-400 mx-auto" />
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Error 404
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link 
          to="/home"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl transform rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-3xl transform -rotate-12 animate-pulse" />
      </div>
    </div>
  );
}

export default Error404;