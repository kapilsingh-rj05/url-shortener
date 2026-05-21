import { Router } from "express";
import { actualUrlRedirect, analyticsDashboard, shortUrlGenerate } from "../controllers/url.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router
    .route("/")
    .post(verifyJWT, shortUrlGenerate)

router
    .route("/:shortId")
    .get(actualUrlRedirect)

router
    .route("/analytics/:shortId")
    .get(verifyJWT, analyticsDashboard)

export default router