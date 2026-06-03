import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for routing

const PostForgot = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md text-center">
        
        {/* Success Icon Graphic */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          <svg 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Password Changed!
        </h1>
        <p className="mb-8 text-sm text-gray-600 leading-relaxed">
          Your password has been changed successfully. You can now use your new credentials to securely log back into your account.
        </p>

        {/* Navigation Action */}
        <Link 
          to="/login"
          className="block w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-center"
        >
          Go to Login
        </Link>
        
      </div>
    </div>
  );
};

export default PostForgot;