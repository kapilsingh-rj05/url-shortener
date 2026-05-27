import userModel from "../models/user.model.js"
import urlModel from "../models/url.model.js"
import mongoose from "mongoose"
import otpModel from "../models/otp.model.js"
import sendEmail from "../utils/nodeMailer.js"
import getOtpTemplate from "../utils/emailTemplate.js"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await userModel.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
    
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        return {error:"error occured while generating tokens"}
    }
}

const loginUser = async(req,res) => {
    const {username, password} = req.body

    if(!username && !email){
        return res.status(400).json({error:"Username and email both can not be empty"})
    }

    const existUser = await userModel.findOne({
        $or:[{username:username},{email:username}]
    })

    if(!existUser){
        return res.status(400).json({error:"User does not exist"})
    }

    const validPassword = await existUser.isPasswordCorrect(password)

    if(!validPassword){
        return res.status(400).json({error:"Password is not valid"})
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existUser._id)

    const loggedInUser = await userModel.findById(existUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:24*60*60*1000
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({status:"success"})
}

const logoutUser = async(req,res) => {
    await userModel.findByIdAndUpdate(
        req.user?._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {new:true}
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24*60*60*1000
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({message:"User logged Out"})
}

// const registerUser = async(req,res) => {
//     const {fullName, username, password, email} = req.body

//     if([fullName, username, password, email].some((field)=>field.trim()==="")){
//         return res.status(400).json({error:"Not enough credentials to register"})
//     }

//     const existUser = await userModel.findOne({
//         $or:[{username},{email}]
//     })

//     if(existUser){
//         return res.status(400).json({error:"user already exists"})
//     }

//     const user = await userModel.create({
//         fullName,
//         email,
//         username,
//         password
//     })

//     if(!user){
//         return res.status(500).json({error:"error occured while registering user"})
//     }

//     return res.status(200).json({status:"success"})
// }

const getUrlsByUser = async(req,res)=>{
    const urls = await urlModel.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        }
    ])

    // console.log(urls)

    if(!urls || urls.length===0){
        return res.status(500).json({error:"No URLs created by You Yet"})
    }

    return res.status(200).json(urls)
}

// This route just checks if the user is verified by your auth middleware
const getUser = async (req, res) => {
  // req.user is populated by your verifyJWT middleware
  if (!req.user) {
    return res.status(401).json({ authenticated: false });
  }
  
  return res.status(200).json({
    authenticated: true,
    user: req.user
  });
};

const registerWithOtp = async(req,res) => {
    const {fullName, username, email, password} = req.body

    const existUser = await userModel.findOne({email})

    if(existUser){
        return res.status(400).json({error:"user already exists"})
    }

    const generatedOTP = Math.floor(100000 + Math.random()*900000)

    await otpModel.deleteMany({email})
    await otpModel.create({email, otp: generatedOTP})

    const htmlContent = getOtpTemplate(fullName, generatedOTP);
    const fallbackText = `Your Shortify verification OTP code is ${generatedOTP}. It will expire in 10 minutes.`;

    await sendEmail(
        email, 
        "Verify your account - Shortify", 
        fallbackText,
        htmlContent
    )

    return res.status(200).json({status:"success", message:"OTP sent to mail. Please verify"})
}

const resendCode = async(req,res) => {
    const {email, fullName} = req.body

    const userOtp = await otpModel.findOne({email})

    if (!userOtp) {
        return res.status(404).json({ 
            status: "failed", 
            message: "No OTP request found for this email. Please sign up or request a new OTP first." 
        });
    }

    const NOW = new Date()

    if(userOtp.codeLastSentAt){
        const timeDifference = (NOW - new Date(userOtp.codeLastSentAt))/1000
        if(timeDifference < 60){
            const secondsLeft = Math.ceil(60-timeDifference)
            return res.status(425).json({status:"failed", message:`Please wait ${secondsLeft} seconds before sending a new code`})
        }
    }

    const newCode = Math.floor(100000 + Math.random()*900000)

    userOtp.otp = newCode
    userOtp.codeExpiresAt = new Date(Date.now() + 10*60*1000)
    userOtp.codeLastSentAt = NOW

    await userOtp.save()

    const htmlContent = getOtpTemplate(fullName, newCode);
    const fallbackText = `Your Shortify verification OTP code is ${newCode}. It will expire in 10 minutes.`;

    await sendEmail(
        email, 
        "Verify your account - Shortify", 
        fallbackText,
        htmlContent
    )

    return res.status(200).json({status:"success",message:"A fresh verification code sent to your email"})
}

const verifyOTPandRegister = async(req,res) => {
    const {fullName, email, username, password, otp} = req.body

    const otpRecord = await otpModel.findOne({email})

    if (!otpRecord || String(otp).trim() !== String(otpRecord.otp).trim()) {
        return res.status(400).json({error:"OTP does not match"})
    }

    const user = await userModel.create({
        fullName, email, username, password
    })

    return res.status(200).json({message:"OTP verified", status:"success"})
}

export {
    loginUser,
    logoutUser,
    registerWithOtp,
    verifyOTPandRegister,
    getUrlsByUser,
    getUser,
    resendCode
}