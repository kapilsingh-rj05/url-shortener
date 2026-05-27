import {Router} from "express"
import { getUrlsByUser, 
    getUser, 
    loginUser, 
    logoutUser, 
    registerWithOtp, 
    resendCode, 
    verifyOTPandRegister 
} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/getUser").get(verifyJWT, getUser)
router.route("/register").post(registerWithOtp)
router.route("/verify").post(verifyOTPandRegister)
router.route("/resend-otp").post(resendCode)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/getUrls").get(verifyJWT, getUrlsByUser)

export default router