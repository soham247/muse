import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, KeyRound } from 'lucide-react';
import LogoutBtn from '../LogoutBtn';

const DropdownMenu = ({ userId, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 p-1 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl z-50">
      <div className="py-1">
        <button 
          onClick={() => handleNavigation(`/profile/${userId}`)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
        >
          <User className="w-4 h-4" />
          <span>View Profile</span>
        </button>

        <button 
          onClick={() => handleNavigation('/change-password')}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
        >
          <KeyRound className="w-4 h-4" />
          <span>Change Password</span>
        </button>

        <div className="h-px bg-white/10 my-1" />
        
        <div className="flex justify-center p-2">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;