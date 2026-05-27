import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans px-4 py-16">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heavy Typography & Core Action */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
            Pricing Update
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Powerful links. <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Zero cost.
            </span>
          </h1>
          
          <p className="text-sm font-medium text-slate-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
            We believe advanced link optimization shouldn't sit behind a paywall. Shortify is entirely free for everyone while we expand our infrastructure.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
            >
              Get Started Instantly
            </button>
            <p className="mt-3 text-xs text-slate-400">No credit card or commitment required.</p>
          </div>
        </div>

        {/* Right Column: Premium Feature Comparison List */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Row 1 */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm shadow-slate-100/40">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Unlimited Shortening & API Access</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Create as many clean URLs as your project demands without artificial daily caps.</p>
            </div>
            <span className="ml-auto text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md">Free</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm shadow-slate-100/40">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Real-time Advanced Geo-Analytics</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Track location metrics, device configurations, and referral traffic origins instantly.</p>
            </div>
            <span className="ml-auto text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md">Free</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm shadow-slate-100/40">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Custom Branded Aliases</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Personalize the slug trailing your links to build authority and increase your click-through rates.</p>
            </div>
            <span className="ml-auto text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md">Free</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Pricing