import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required: true
    },
    codeExpiresAt:{
        type:Date,
    },codeLastSentAt:{
        type:Date
    }
})

const otpModel = mongoose.model("OTP", otpSchema)

export default otpModel