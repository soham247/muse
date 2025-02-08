import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, XCircle } from 'lucide-react';

function SomethingWentWrong() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-8 relative"
        >
          <XCircle className="w-20 h-20 text-red-400 mx-auto" />
          <div className="absolute inset-0 bg-red-400/20 blur-xl rounded-full" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
          Oops! Something Went Wrong
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          We're experiencing some technical difficulties.
        </p>

        <div className="flex items-center gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            Try Again
          </button>
        </div>
      </motion.div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-red-500/10 to-purple-500/10 blur-3xl transform rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-3xl transform -rotate-12 animate-pulse" />
      </div>
    </div>
  );
}

export default SomethingWentWrong;