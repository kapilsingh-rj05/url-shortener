import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation
import axios from "axios"
import {useNavigate} from "react-router-dom"

const ChangePassword = () => {
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm();
  const [status, setStatus] = useState({ text: "", type: "" });
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    // Basic frontend safety validation
    if (data.oldPassword === data.newPassword) {
      setStatus({ text: "New password cannot be the same as your old password.", type: "error" });
      return;
    }

      await axios.post('/user/change-password', data)
      .then((response)=>{
        if(response.data.status==="success"){
            setStatus({ text: "Password changed successfully!", type: "success" });
            navigate("/postForgot")
            reset();
        }
        else{
            setStatus({type:"failed", text:"error during changing your password"})
        }
      })
      .catch((error)=>{
        setStatus({ 
            text: error.response?.data?.message || "Failed to change password. Please check your credentials.", 
            type: "error" 
        });
      })
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Change Password</h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Please enter your credentials to update your account password safely.
        </p>

        {/* Dynamic Status Alert Div */}
        {status.text && (
          <div className={`mb-4 rounded-lg p-3 text-sm font-medium border ${
            status.type === "success" 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 px-1">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              {...register("email", { required: "Email is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Old Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 px-1">Old Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              {...register("oldPassword", { required: "Old password is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* New Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700 px-1">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              {...register("newPassword", { 
                required: "New password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full rounded-lg py-2.5 mt-2 text-sm font-semibold text-white transition flex justify-center items-center gap-2 ${
              isSubmitting 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Updating...
              </>
            ) : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;