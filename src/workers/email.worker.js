import "../config/env.js"
import {Worker} from "bullmq"
import redisConnection from "../config/redis.js"
import { handleEmailjob } from "../handlers/email.handler.js";


const worker=new Worker("email-queue",
    async(job)=>{
       console.log("worker recieve the job");
       await handleEmailjob(job);
    },
    {
        connection:redisConnection
    }
)