import express from "express";
import authControler from "../controlers/auth.controler.js";
import { rateLimiter } from "../midleware/ratelimiter.midleware.js";

const authcontroler=new authControler();

export const authRouter=express.Router();

authRouter.post("/",rateLimiter({
    keyGenerator:(req)=>req.ip,
    limit:5,
    windowInSeconds:3600
}),authcontroler.signUp.bind(authcontroler));
authRouter.post("/verify-otp",rateLimiter({
    keyGenerator:(req)=>req.body.email,
    limit:5,
    windowInSeconds:600
}), authcontroler.verifyOtp.bind(authcontroler));
authRouter.post("/forgot-password",rateLimiter({
    keyGenerator:(req)=>req.body.email,
    limit:3,
    windowInSeconds:3600
}),authcontroler.forgotPassword.bind(authcontroler));
authRouter.post("/reset-password",authcontroler.resetPassword.bind(authcontroler));