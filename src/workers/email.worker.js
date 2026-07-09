import "../config/env.js"
import {Worker} from "bullmq"
import redisConnection from "../config/redis.js"
import { handleEmailjob } from "../handlers/email.handler.js";
import { emailDLQ } from "../queue/DLQ.queue.js";


const worker=new Worker("email-queue",
    async(job)=>{
       console.log("worker recieve the job");
       await handleEmailjob(job);
    },
    {
        connection:redisConnection
    }
)

worker.on("failed",async(job,err)=>{
    if(!job) return;

    if (job.attemptsMade >= job.opts.attempts) {
    // Move to DLQ
      await emailDLQ.add(
        job.name,
        {
          originalJobId: job.id,
          data: job.data,
          error: err.message,
          failedAt: new Date(),
          options:job.opts,
          queueName:job.queueName,
          attemptsMade:job.attemptsMade
        }
    )
   }
})