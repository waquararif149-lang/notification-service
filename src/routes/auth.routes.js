import express from "express";
import authControler from "../controlers/auth.controler.js";

const authcontroler=new authControler();

export const authRouter=express.Router();

authRouter.post("/",authcontroler.signUp.bind(authcontroler));
authRouter.post("/verify-otp",authcontroler.verifyOtp.bind(authcontroler));