import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {NavLink} from "react-router-dom"
import { logout } from '../store/authSlice'

const Header = () => {

  const isLogin = useSelector(state=>state.auth.status)
  const dispatch = useDispatch()

  return (
  <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white font-sans">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
      
      {/* Brand Logo */}
      <div className="text-xl font-extrabold tracking-tight text-gray-900">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-block -rotate-45 text-xl">✂️</span>
          <span>Shortify</span>
        </a>
      </div>

      {/* Navigation links */}
      <nav className="flex items-center gap-8">
        <NavLink href="#features" className="text-sm font-medium text-gray-600 transition hover:text-gray-900">
          Features
        </NavLink>
        <NavLink href="#pricing" className="text-sm font-medium text-gray-600 transition hover:text-gray-900">
          Pricing
        </NavLink>
        <NavLink href="#analytics" className="text-sm font-medium text-gray-600 transition hover:text-gray-900">
          Track Clicks
        </NavLink>
        {!isLogin && (
          <NavLink
            to="/register" 
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Get Started Free
          </NavLink>
        )}

        {isLogin && (
          <NavLink
            to="/login" 
            onClick={()=>{
              dispatch(logout())
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Logout
          </NavLink>
        )}
      </nav>
      
    </div>
  </header>
)
}

export default Header