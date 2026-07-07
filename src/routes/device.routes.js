import express from "express";
import deviceControler from "../controlers/device.controler.js";
const devicecontroler=new deviceControler();
const deviceRouter=express.Router();

deviceRouter.post("/register",devicecontroler.register.bind(devicecontroler));

export default deviceRouter;