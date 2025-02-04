import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleUser, Search } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.userId);
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    const searchReg = new RegExp(search);
    navigate(`search${searchReg}`);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Muse
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center justify-center w-full space-x-6 max-w-2xl mx-auto">
              {isLoggedIn && (
                <form onSubmit={handleSearch} className="w-full max-w-xl flex">
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search posts..."
                    className="w-full ml-4 md:w-full px-4 py-2 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-l-lg focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 mr-4 bg-white/5 border border-white/10 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && (
                <>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 px-4 py-2 font-semibold"
                        : "px-4 py-2 text-white hover:text-blue-500 transition-colors duration-300 font-semibold"
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/create-blog"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 px-4 py-2 font-semibold"
                        : "px-4 py-2 text-white hover:text-blue-500 transition-colors duration-300 font-semibold"
                    }
                  >
                    Create
                  </NavLink>
                </>
              )}
            </div>

            {/* Right Side Navigation */}
            <div className="flex flex-wrap items-center space-x-4">
                { isLoggedIn &&<div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-300"
                  >
                    <CircleUser className="w-6 h-6 text-gray-300" />
                  </button>

                  {dropdown && (
                    <DropdownMenu 
                      userId={user} 
                      onClose={() => setDropdown(false)}
                    />
                  )}
                </div>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;