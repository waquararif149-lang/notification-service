import express, { urlencoded } from "express";
import { authRouter } from "./routes/auth.routes.js";
import serverAdapter from "./config/bullboard.js";

const app=express();

app.use(express.json());
app.use("/admin/queues",serverAdapter.getRouter());
app.use(express.urlencoded({extended:true}))

app.use("/api/user",authRouter);

export default app;
