import urlModel from "../models/url.model.js";
import { nanoid } from "nanoid";

const shortUrlGenerate = async(req,res)=>{
    const {url} = req.body;

    if(!url || url.trim()===""){
        return res.status(400).json({error:"url is required"})
    }

    const existURL = await urlModel.findOne({
        $and:[{redirectUrl:url}, {user:req.user?._id}]
    })

    if(existURL){
        return res.status(400).json({error:"You have this URL short code already in your pocket"})
    }

    const shortID = nanoid(8)

    const nanourl = await urlModel.create({
        shortId: shortID,
        redirectUrl: url,
        user: req.user?._id
    })

    return res.status(200).json({shortId:shortID});
}

// router.get("/:shortId", actualUrlRedirect) <-- No verifyJWT here!
const actualUrlRedirect = async (req, res) => {
    try {
        const { shortId } = req.params;

        // 1. Search purely by shortId so any guest user can use it
        const doc = await urlModel.findOne({ shortId });

        if (!doc) {
            return res.status(404).send("<h1>404: Link Not Found</h1>");
        }

        // 2. Safety Check: If the original URL doesn't start with http:// or https://, 
        // the browser will try to append it to your localhost port. We fix that here.
        let targetUrl = doc.redirectUrl;
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${targetUrl}`;
        }

        // 3. Send the redirection command to the browser tab
        return res.redirect(targetUrl);

    } catch (error) {
        console.error("Redirect Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const analyticsDashboard = async(req,res) => {
    const {shortId} = req.params

    if(!shortId || shortId.trim()===""){
        return res.status(400).json({error:"Id not valid"})
    }

    const doc = await urlModel.findOne({
        shortId
    })

    if(!doc){
        return res.status(400).json({error:"document not found"})
    }

    const totalClicks = doc.visitHistory.length
    const visits = doc.visitHistory
    
    return res.status(200).json({totalClicks, visits})
}

export {shortUrlGenerate, actualUrlRedirect, analyticsDashboard}