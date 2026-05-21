import React, { useState } from 'react' // FIX: Missing useState import
import { useForm } from 'react-hook-form'
import axios from "axios"

const EncodeForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const [status, setStatus] = useState({ text: "", type: "" })

  const onSubmit = (data) => {
    axios.post("/url", data)
      .then((response) => {
        // FIX: React state must be updated using the setter function 'setStatus()', NOT by mutating properties directly
        setStatus({
          text: `Short URL Created! ID: ${response.data.shortId}`,
          type: "success"
        })
        reset() // Clears input on success
      })
      .catch((error) => {
        // FIX: React state must be updated using 'setStatus()'
        setStatus({
          text: error.response?.data?.error || "An error occurred while shortening the URL",
          type: "error"
        })
      })
  }

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-4">
        
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Shorten Your Link</h2>
          <p className="text-xs text-gray-500 mt-1">Transform long destination links into tidy shortened identifiers</p>
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200"
        >
          <input 
            type="url" 
            placeholder="Enter long URL here (https://...)" 
            className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none"
            {...register("url", { required: true })}
          />
          <button 
            type="submit" 
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-sm whitespace-nowrap"
          >
            Shorten
          </button>
        </form>

        {/* Status Alerts */}
        {status.text && (
          <div 
            className={`rounded-lg p-3 text-sm font-medium border transition-all duration-300 ${
              status.type === "success" 
                ? "bg-green-50 border-green-200 text-green-800" 
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {status.type === "success" ? (
              <div className="flex flex-col gap-1">
                <span>{status.text.split('ID: ')[0]}</span>
                <span className="font-mono bg-green-100/50 rounded px-2 py-1 border border-green-200 text-center select-all mt-1">
                  {status.text.split('ID: ')[1]}
                </span>
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

export default EncodeForm
