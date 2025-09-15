/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Home,
  FileText,
  ChefHat,
  Info,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogin = () => {
    
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileDropdownOpen(false);
  };

  const navItems = [
    { path: "/", name: "หน้าหลัก", icon: Home },
    { path: "/posts", name: "โพสต์", icon: FileText },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/Recipe-App.svg" alt="Logo" className="h-8 mr-2" />
              <span className="text-2xl font-bold text-green-600">Recipe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map(({ path, name, icon: IconComponent }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActivePath(path)
                      ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={handleLogin}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-3" />
                      โปรไฟล์
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      ตั้งค่า
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navItems.map(({ path, name, icon: IconComponent }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium block ${
                    isActivePath(path)
                      ? "text-green-600 bg-green-50"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {name}
                </Link>
              ))}
            </div>

            {/* Mobile Login/Profile */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {!isLoggedIn ? (
                <div className="px-5">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center px-5 py-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-base font-medium text-gray-800">
                      ผู้ใช้งาน
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    โปรไฟล์
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    ตั้งค่า
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
