import React, { useState } from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form'

const DecodeForm = () => {
  // Destructured formState: { isSubmitting } from react-hook-form
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  // State to hold both the text message and a status type ('success' or 'error')
  const [status, setStatus] = useState({ text: "", type: "" })

  const onSubmit = (data) => {
    // Returning the axios promise lets react-hook-form manage the isSubmitting lifecycle automatically
    return axios.get(`/url/${data.shortId}`)
      .then((response) => {
        const actualUrl = response.data.url;
        
        setStatus({ 
          text: `Your URL is: ${actualUrl}`, 
          type: "success" 
        })
        reset()
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Error occurred while fetching URL.";
        
        setStatus({ 
          text: errorMsg, 
          type: "error" 
        })
      })
  }

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-4">
        
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Decode Short URL</h2>
          <p className="text-xs text-gray-500 mt-1">Retrieve original destination pathways instantly</p>
        </div>

        {/* Form Container */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className={`flex w-full items-center gap-2 rounded-lg border bg-white p-1.5 shadow-sm transition-all duration-200 ${
            isSubmitting 
              ? "border-gray-200 bg-slate-50" 
              : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
          }`}
        >
          <input 
            type="text" 
            placeholder={isSubmitting ? "Decoding identifier..." : "Enter Short ID (e.g. ab12cd)"}
            disabled={isSubmitting} // Lock input field while fetching
            className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none disabled:text-slate-400"
            {...register("shortId", { required: true })}
          />
          <button 
            type="submit" 
            disabled={isSubmitting} // Disable interaction while processing
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-150 shadow-sm whitespace-nowrap flex items-center justify-center gap-2 ${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {isSubmitting ? (
              <>
                {/* Embedded clean SVG loader matching your site theme */}
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Decoding...
              </>
            ) : "Decode"}
          </button>
        </form>

        {/* Dynamic Status Notification Alert */}
        {status.text && (
          <div 
            className={`rounded-lg p-3 text-sm font-medium transition-all duration-300 border ${
              status.type === "success" 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {status.type === "success" ? (
              <div className="flex flex-col gap-1">
                <span>{status.text.split(': ')[0]}:</span>
                <a 
                  href={status.text.split(': ')[1]} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold underline break-all hover:text-green-900"
                >
                  {status.text.split(': ')[1]}
                </a>
              </div>
            ) : (
              <span>{status.text}</span>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default DecodeForm