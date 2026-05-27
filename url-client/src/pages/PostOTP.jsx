import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-sans">
      <div className="w-full max-w-md scale-in rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-10">
        
        {/* Animated Checkmark Wrapper */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="3" 
              stroke="currentColor" 
              className="h-7 w-7"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Header Content */}
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Registration <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Successful!</span>
        </h1>
        
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Your account has been created completely. You can now access all features of Shortify.
        </p>

        {/* Informative Step Card */}
        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left">
          <div className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
              !
            </span>
            <p className="text-xs font-medium text-slate-600 leading-normal">
              Please use the registered email and password on the following screen to secure your session.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/login')}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/10 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
        >
          GO TO LOGIN
        </button>

        {/* Simple Brand Footer */}
        <p className="mt-8 text-xs font-medium tracking-wide text-slate-400">
          Shortify Inc. &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;