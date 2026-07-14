import express, { urlencoded } from "express";
import { authRouter } from "./routes/auth.routes.js";
import serverAdapter from "./config/bullboard.js";
import adminRouter from "./routes/admin.routes.js";
import deviceRouter from "./routes/device.routes.js";
import verifyJWT from "./midleware/jwt.midleware.js";
import verifyAdmin from "./midleware/admin.midleware.js";
import cookieParser from "cookie-parser";
import { routePage } from "./templates/email/initialroutepage.js";

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use("/admin/queues",verifyJWT,verifyAdmin,serverAdapter.getRouter());
app.use(express.urlencoded({extended:true}))

app.use("/api/user",authRouter);
app.use("/api/admin",verifyJWT,verifyAdmin,adminRouter);
app.use("/api/device",deviceRouter);
app.get("/",(req,res)=>{
    res.send(routePage)
})

export default app;
