import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const OtpForm = () => {
    // Destructured isSubmitting from formState to handle the button state cleanly
    const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: { otp: new Array(6).fill("") }
    })

    const navigate = useNavigate()
    const email = useSelector(state => state.user.email)

    const [status, setStatus] = useState({ type: "", text: "" })
    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

    const onSubmit = (data) => {
        const finalOtp = data.otp.join("")

        // Returning the promise lets react-hook-form handle the loading lifecycle automatically
        return axios.post("/user/forgot/verify", {
            otp: finalOtp,
            email
        })
        .then((response) => {
            if (response.data.status === "success") {
                setStatus({ type: "success", text: "OTP Verified" })
                navigate("/changePassword")
                reset()
            }
        })
        .catch((error) => {
            setStatus({ type: "error", text: error.response?.data?.error || "Something went wrong" })
        })
    }

    const handleInputChange = (e, index) => {
        const val = e.target.value

        if (isNaN(val)) {
            setValue(`otp.${index}`, "")
            return;
        }

        if (val && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
            e.target.previousSibling.focus()
        }
    }

    const handleResendCode = () => {
        if (cooldown > 0) return;

        axios.post("/user/resend-otp", { email, fullName })
        .then((response) => {
            console.log("Email sent again", response)
            setStatus({ type: "success", text: "A fresh verification code sent!" })
            setCooldown(60)
        })
        .catch((error) => {
            console.log(error)
            
            if (error.response?.status === 425) {
                const serverMessage = error.response.data.message;
                const numericSeconds = serverMessage.match(/\d+/);
                
                if (numericSeconds) {
                    setCooldown(parseInt(numericSeconds[0], 10));
                }
                setStatus({ type: "error", text: serverMessage });
            } else {
                setStatus({ type: "error", text: error.response?.data?.message || "Failed to resend code" });
            }
        })
    }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-100/40">
        
        {/* Header Text Section */}
        <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-sans sm:text-3xl">
            Verify your <span className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 to-blue-600">identity</span>
            </h2>
            <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">
            We've sent a 6-digit verification code to your email.
            </p>
        </div>

        {/* Form Core Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="flex justify-center gap-2 sm:gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                key={index}
                type="text"
                maxLength="1"
                disabled={isSubmitting}
                {...register(`otp.${index}`, {
                    required: true,
                    onChange: (e) => handleInputChange(e, index)
                })}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-12 w-12 rounded-xl border-2 border-slate-200 text-center text-xl font-bold text-slate-900 transition-all duration-150 font-sans focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:h-14 sm:w-14 sm:text-2xl disabled:bg-slate-50 disabled:text-slate-400"
                />
            ))}
            </div>

            {status.text && (
                <div className={`rounded-xl p-3 text-xs font-semibold font-sans border transition-all duration-300 sm:text-sm ${
                    status.type === "success" 
                        ? "bg-emerald-50 border-emerald-200/60 text-emerald-700" 
                        : "bg-rose-50 border-rose-200/60 text-rose-700"
                }`}>
                    <div className="flex items-center gap-2">
                        {status.type === "success" ? (
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        ) : (
                            <span className="flex h-2 w-2 rounded-full bg-rose-500" />
                        )}
                        {status.text}
                    </div>
                </div>
            )}

            {/* Verification Action Button */}
            <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                    ? "from-indigo-400 to-blue-400 bg-gradient-to-r cursor-not-allowed"
                    : "from-indigo-600 to-blue-600 bg-gradient-to-r hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
            }`}
            >
            {isSubmitting ? (
                <>
                    {/* Embedded design-matching template spinner */}
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    VERIFYING...
                </>
            ) : "VERIFY CODE"}
            </button>
        </form>

        {/* Footer Interactive Action */}
        <div className="text-center text-xs sm:text-sm">
            <p className="font-medium text-slate-400">
            Didn't receive the email?{" "}
            {cooldown > 0 ? (
                <span className="font-semibold text-slate-500">
                    Resend available in <span className="text-indigo-600 tabular-nums">{cooldown}s</span>
                </span>
            ) : (
                <button 
                    onClick={handleResendCode}
                    type="button"
                    disabled={isSubmitting}
                    className="font-semibold text-indigo-600 transition-colors duration-150 hover:text-indigo-800 focus:outline-none cursor-pointer disabled:text-indigo-300 disabled:cursor-not-allowed"
                >
                    Resend Code
                </button>
            )}
            </p>
        </div>

        </div>
    </div>
  )
}

export default OtpForm