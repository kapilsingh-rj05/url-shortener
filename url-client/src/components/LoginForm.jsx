// import React,{useState} from 'react'
// import {set, useForm} from "react-hook-form"
// import axios from "axios"

// const LoginForm = () => {

//   const {register, handleSubmit, reset} = useForm()
//   const [status, setStatus] = useState({type:"", text:""})

//   const onSubmit = (data)=>{
//     try {
//       axios.post("http://localhost:4000/user/login", data)
//       .then((response)=>{
//         if(response.status==="success"){
//           setStatus({type:"success", text:"User logged in successfully"})
//         }
//         else{
//           setStatus({type:"failed", text:"User credentials didn't match"})
//         }

//         reset()
//       })
//     } catch (error) {
//       setStatus({type:"error", text: error.response?.data?.error || "An error occurred while shortening the URL"})
//     }
//   }

//   return (
//   <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
//     <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
//       <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Login</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//         <input 
//           type="text" 
//           placeholder="Username or email" 
//           {...register("username", {required:true})}
//           className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           {...register("password", {required:true})}
//           className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//         />
//         <button 
//           type="submit" 
//           className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800"
//         >
//           Login
//         </button>
//       </form>
//     </div>

//     {status}
//   </div>
// )
// }

// export default LoginForm

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {login} from "../store/authSlice"
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const [status, setStatus] = useState({ type: "", text: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    // Axios uses .catch() for errors, try/catch won't intercept failed .then() promises automatically
    axios.post("/user/login", data)
      .then((response) => {
        if (response.status === "success" || response.data?.status === "success") {
          setStatus({ type: "success", text: "User logged in successfully" })
          dispatch(login(data))
          reset()
          navigate("/")
        } else {
          setStatus({ type: "failed", text: "User credentials didn't match" })
        }
      })
      .catch((error) => {
        setStatus({ 
          type: "error", 
          text: error.response?.data?.error || error.response?.data?.error || "An error occurred during login" 
        })
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Login</h1>

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
          <input 
            type="text" 
            placeholder="Username or email" 
            {...register("username", { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <input 
            type="password" 
            placeholder="Password" 
            {...register("password", { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button 
            type="submit" 
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            Login
          </button>
          {/* Registration Redirect Text */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account??{" "}
            <Link 
              to="/register" 
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm