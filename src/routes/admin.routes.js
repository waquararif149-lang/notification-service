import express from "express"
import adminControler from "../controlers/admin.controler.js";

const admincontroler=new adminControler();

const adminRouter=express.Router();

adminRouter.get("/queues/stats",admincontroler.getQueueStats.bind(admincontroler));
adminRouter.get("/queues/failed",admincontroler.getFailedJobs.bind(admincontroler));
adminRouter.post("/queues/retry/:jobId",admincontroler.retryFailedJob.bind(admincontroler));
adminRouter.post("/queues/delete/:jobId",admincontroler.deleteJob.bind(admincontroler));
adminRouter.post("/queues/resume",admincontroler.resumeQueue.bind(admincontroler));
adminRouter.post("/queues/pause",admincontroler.pauseQueue.bind(admincontroler));

export default adminRouter;

