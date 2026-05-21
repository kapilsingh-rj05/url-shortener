import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const verifyJWT = async(req, res, next)=> {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            return res.status(400).json({error:"token does not exist"})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await userModel.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user){
            return res.status(500).json({error:"user not found"})
        }
    
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({error:"error occured"})
    }
}