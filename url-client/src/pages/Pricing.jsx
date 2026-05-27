import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12 relative overflow-hidden">
        
        {/* Subtle decorative background gradient blob */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>

        {/* Free Badge */}
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          Special Launch Offer
        </div>

        {/* Header Section */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Premium analytics. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Zero subscription.</span>
        </h1>
        
        {/* Main Custom Tagline */}
        <p className="mt-4 text-base font-medium text-slate-600 sm:text-lg max-w-md mx-auto">
          No credit cards. No hidden tiers. Shortify is completely <span className="font-bold text-slate-900">free for all users</span> while we scale. Enjoy unrestricted access!
        </p>

        {/* Feature Checkmarks Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100/80">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            <span className="text-sm font-semibold text-slate-700">Unlimited URL Shortening</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            <span className="text-sm font-semibold text-slate-700">Advanced Geo-Tracking</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            <span className="text-sm font-semibold text-slate-700">Custom Branded Aliases</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ✓
            </span>
            <span className="text-sm font-semibold text-slate-700">High-Speed Redirection</span>
          </div>
        </div>

        {/* Price Tag Indicator */}
        <div className="mt-8 flex items-baseline justify-center gap-1">
          <span className="text-5xl font-extrabold tracking-tight text-slate-900">$0</span>
          <span className="text-sm font-semibold text-slate-400">/ forever</span>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:max-w-xs mx-auto">
          <button
            onClick={() => navigate('/')} 
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/10 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
          >
            START SHORTENING FREE
          </button>
        </div>

        {/* Footer Guarantee */}
        <p className="mt-6 text-xs font-medium text-slate-400">
          No commitment required. Simply create an account and optimize your links today.
        </p>

      </div>
    </div>
  )
}

export default Pricing