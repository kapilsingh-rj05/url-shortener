import React from 'react'
import { useNavigate } from 'react-router-dom'

const TrackClicks = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-10">
        
        {/* Feature Icon Graphic */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            className="h-8 w-8 animate-pulse"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-1.072ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12H19.5m-.197 5.303-1.591-1.591M12 19.5v2.25m-5.303-.197 1.591-1.591M2.25 12H4.5m.197-5.303 1.591 1.591" />
          </svg>
        </div>

        {/* Content Heading */}
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Advanced <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Click Analytics</span>
        </h1>
        
        {/* Availability Subtitle */}
        <p className="mt-3 text-sm font-semibold tracking-wide text-indigo-600 uppercase">
          This feature will be available soon
        </p>
        
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          We are currently engineering a robust dashboard to track your shortened URLs, device geographies, and real-time click metrics. 
        </p>

        {/* Progress Bar / Mock Interface Indicator */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Development Progress</span>
            <span className="text-indigo-600">85%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 h-full rounded-full w-[85%]"></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(-1)} // Navigates back to the previous screen cleanly
          className="mt-8 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
        >
          GO BACK
        </button>

        {/* Simple Footer Note */}
        <p className="mt-6 text-xs text-slate-400">
          Want immediate access when we launch? Keep an eye on updates.
        </p>
      </div>
    </div>
  )
}

export default TrackClicks