import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

import urlRoutes from "./routes/url.routes.js"
import userRoutes from "./routes/user.routes.js"

app.use("/url", urlRoutes)
app.use("/user", userRoutes)

export {app}