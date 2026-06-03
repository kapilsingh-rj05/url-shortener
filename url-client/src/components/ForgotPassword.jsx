import React,{useState} from 'react'
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { userDetails } from '../store/userSlice'

const ForgotPassword = () => {
    const {register, handleSubmit, formState:{isSubmitting}} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [status, setStatus] = useState({type:"", text:""})

    const onSubmit = (data) => {
        axios.post("/user/forgot", data)
        .then((response)=>{
            if(response.data.status==="success"){
                setStatus({type:"success", text:"Enter the OTP, sent to you on email"})
                dispatch(userDetails({email:data.email}))
                navigate("/forgot/otp")
            }
            else{
                setStatus({type:"failed", text:"Some error occured... Is your email correct??"})
            }
        })
        .catch((error)=>{
            setStatus({type:"error", message:error?.response?.data?.error || "something went wrong"})
        })
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a code to reset your password.
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
          <input 
            type="email" 
            placeholder="Email address" 
            {...register("email", { required: true })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white transition flex justify-center items-center gap-2 ${
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
                Sending code...
              </>
            ) : "Send reset code"}
          </button>

          {/* Back to Login Redirect */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link 
              to="/login" 
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
            >
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword