
"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun, FaBell } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Theme ko body pe apply karne ke liye useEffect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left Side - Logo & Menu Button */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="md:hidden">
          {sidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        <h2 className="text-2xl font-bold">Shop.co</h2>
      </div>

      {/* Right Side - Theme & Notification Icons */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme}>
          {darkMode ? <FaSun className="text-2xl text-yellow-400" /> : <FaMoon className="text-2xl" />}
        </button>
        <FaBell className="text-2xl" />
      </div>
    </nav>
  );
}

