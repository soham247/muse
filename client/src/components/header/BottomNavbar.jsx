import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PenSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const NavLink = ({ to, icon: Icon, label }) => (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center flex-1 py-2 px-4 transition-all duration-300 ${
        isActive(to) ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-lg border-t border-white/10 z-50"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavLink to="/home" icon={Home} label="Home" />
        <NavLink to="/create-blog" icon={PenSquare} label="Create" />
      </div>
    </motion.nav>
  );
};

export default BottomNavbar;
