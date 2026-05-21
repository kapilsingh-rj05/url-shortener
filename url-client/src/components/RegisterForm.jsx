import React,{useState} from 'react'
import {useForm} from "react-hook-form"
import axios from "axios"

const RegisterForm = () => {

    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm()

    const [status, setStatus] = useState({type:"", text:""})

    const password = watch("password", "")

    const onSubmit = (data) => {
        axios.post("/user/register", data)
        .then((response)=>{
          if(response.data.status==="success"){
            setStatus({type:"success", text:"User registered successfully"})
            reset()
          }
        })
        .catch((error)=>{
          setStatus({type:"error", text:error.response?.data?.error || "Something went wrong"})
        })
    }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-slate-50 px-4 py-12 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm border border-slate-100">
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900">Create your account</h1>
        
        {status.text && (
          <div className={`mb-4 rounded-lg p-3 text-sm font-medium border ${status.type==="success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Full Name</label>
            <input 
              type="text" 
              {...register("fullName", { required: "Full name is required" })}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
            />
            {errors.fullName && <span className="text-[11px] text-red-500">{errors.fullName.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <input 
              type="email" 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
            />
            {errors.email && <span className="text-[11px] text-red-500">{errors.email.message}</span>}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Username</label>
            <input 
              type="text" 
              {...register("username", { required: "Username is required" })}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.username ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
            />
            {errors.username && <span className="text-[11px] text-red-500">{errors.username.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <input 
              type="password"  
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" }
              })}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
            />
            {errors.password && <span className="text-[11px] text-red-500">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
            <input 
              type="password" 
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
            />
            {errors.confirmPassword && <span className="text-[11px] text-red-500">{errors.confirmPassword.message}</span>}
          </div>

          <button 
            type="submit" 
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <a href="/login" className="font-medium text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm