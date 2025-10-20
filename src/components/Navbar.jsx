import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-cream-200 to-beige-200 shadow-lg border-b-2 border-blue-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-blue-500 text-cream-50 p-2 rounded-lg font-bold text-lg mr-3">
              GG
            </div>
            <h1 className="text-xl font-bold text-blue-900">Learning Platform</h1>
          </div>
          <ul className="flex space-x-2">
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className="text-blue-700 hover:text-blue-800 hover:bg-sky-200 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/upload" 
                    className="text-blue-700 hover:text-blue-800 hover:bg-sky-200 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="text-blue-700 hover:text-blue-800 hover:bg-beige-300 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-beige-400 hover:border-beige-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="bg-blue-500 text-cream-50 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar