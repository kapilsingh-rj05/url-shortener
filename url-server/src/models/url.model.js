import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
            unique:true
        },
        redirectUrl:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps:true}
)

const urlModel = mongoose.model("URL", urlSchema)

export default urlModel