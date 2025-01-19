import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Key, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const PasswordInput = ({ label, name, value, onChange, placeholder, icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-blue-400" />
        <label htmlFor={name} className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-3 px-4 pr-12 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 placeholder:text-gray-500"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputs = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return false;
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(inputs.newPassword)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
      return;
    }

    if (inputs.newPassword !== inputs.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/change-password`,
        {
          currentPassword: inputs.currentPassword,
          newPassword: inputs.newPassword
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully');
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Change Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={inputs.currentPassword}
              onChange={handleInputs}
              placeholder="Enter your current password"
              icon={Lock}
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={inputs.newPassword}
              onChange={handleInputs}
              placeholder="Enter your new password"
              icon={Key}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputs}
              placeholder="Confirm your new password"
              icon={Shield}
            />

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Changing Password...
                </>
              ) : (
                'Change Password'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;