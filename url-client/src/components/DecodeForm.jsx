import React, { useState } from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form'

const DecodeForm = () => {
  const { register, handleSubmit, reset } = useForm()

  // Change state to hold both the text message and a status type ('success' or 'error')
  const [status, setStatus] = useState({ text: "", type: "" })

  const onSubmit = (data) => {
    axios.get(`/url/${data.shortId}`)
      .then((response) => {
        
        const actualUrl = response.data.url;
        
        setStatus({ 
          text: `Your URL is: ${actualUrl}`, 
          type: "success" 
        })
        reset()
      })
      .catch((error) => {
        // Fallback to see if the backend sent a specific 400 error message
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
        </div>

        {/* Form Container */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200"
        >
          <input 
            type="text" 
            placeholder="Enter Short ID (e.g. ab12cd)" 
            className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none"
            {...register("shortId", { required: true })}
          />
          <button 
            type="submit" 
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-sm whitespace-nowrap"
          >
            Decode
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
