import "../config/env.js"
import "../config/firebase.js"
import redisConnection from "../config/redis.js"
import {Worker} from "bullmq"
import { handlePushJob } from "../handlers/push.handler.js";

const worker=new Worker("push-queue",
    async(job)=>{
      console.log("pushworker recieve the job");
      console.log("log from pushworker",job.data);
      await handlePushJob(job);
    },
    {connection:redisConnection}
)