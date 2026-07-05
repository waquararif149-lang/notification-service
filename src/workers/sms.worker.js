import "../config/env.js";
import {Worker} from "bullmq";
import redisConnection from "../config/redis.js";
import { handleSMSjob } from "../handlers/sms.handler.js";

const worker=new Worker("sms-queue",
    async(job)=>{
      console.log("smsWorker recieve the job");
      await handleSMSjob(job);
    },
    {connection:redisConnection}
)