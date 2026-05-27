import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../store/authSlice'
import axios from 'axios'

const Header = () => {
  const isLogin = useSelector(state => state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Track async logging-out state
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogoutClick = (e) => {
    // Prevent the NavLink from changing route instantly
    e.preventDefault()
    if (isLoggingOut) return

    setIsLoggingOut(true)

    // Call your backend logout route to clear HTTP-only cookies
    axios.post("/user/logout")
      .then(() => {
        dispatch(logout())
        navigate("/login")
      })
      .catch((error) => {
        console.error("Logout failed:", error)
        // Even if server request hits an error, clear the frontend session as a fallback
        dispatch(logout())
        navigate("/login")
      })
      .finally(() => {
        setIsLoggingOut(false)
      })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white font-sans">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        
        {/* Brand Logo */}
        {isLogin ? (
          <div className="text-xl font-extrabold tracking-tight text-gray-900">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="inline-block -rotate-45 text-xl">✂️</span>
              <span>Shortify</span>
            </NavLink>
          </div>
        ) : (
          <div className="text-xl font-extrabold tracking-tight text-gray-900">
            <NavLink to="/login" className="flex items-center gap-2">
              <span className="inline-block -rotate-45 text-xl">✂️</span>
              <span>Shortify</span>
            </NavLink>
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex items-center gap-8">
          <NavLink 
            to={isLogin ? "/features" : "/login"} 
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Features
          </NavLink>
          
          <NavLink 
            to={isLogin ? "/pricing" : "/login"} 
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Pricing
          </NavLink>
          
          <NavLink 
            to={isLogin ? "/click-tracking" : "/login"} 
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Track Clicks
          </NavLink>

          {/* Conditional Action Button */}
          {!isLogin ? (
            <NavLink
              to="/register" 
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Get Started Free
            </NavLink>
          ) : (
            <button
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition flex items-center gap-2 ${
                isLoggingOut 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              }`}
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Ending Session...
                </>
              ) : "Logout"}
            </button>
          )}
        </nav>
        
      </div>
    </header>
  )
}

export default Header