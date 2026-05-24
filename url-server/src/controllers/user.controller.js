import userModel from "../models/user.model.js"
import urlModel from "../models/url.model.js"
import mongoose from "mongoose"

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
    const {username, email, password} = req.body

    if(!username && !email){
        return res.status(400).json({error:"Username and email both can not be empty"})
    }

    const existUser = await userModel.findOne({
        $or:[{username},{email}]
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
        sameSite:none,
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
        sameSite: none,
        maxAge: 24*60*60*1000
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({message:"User logged Out"})
}

const registerUser = async(req,res) => {
    const {fullName, username, password, email} = req.body

    if([fullName, username, password, email].some((field)=>field.trim()==="")){
        return res.status(400).json({error:"Not enough credentials to register"})
    }

    const existUser = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(existUser){
        return res.status(400).json({error:"user already exists"})
    }

    const user = await userModel.create({
        fullName,
        email,
        username,
        password
    })

    if(!user){
        return res.status(500).json({error:"error occured while registering user"})
    }

    return res.status(200).json({status:"success"})
}

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

export {
    loginUser,
    logoutUser,
    registerUser,
    getUrlsByUser
}