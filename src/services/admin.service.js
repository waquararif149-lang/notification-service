import { emailDLQ } from "../queue/DLQ.queue.js";
import { emailQueue } from "../queue/email.queue.js";

export default class adminService{

    async getQueueStats(){
        return await emailQueue.getJobCounts();
    }

    async getFailedJobs(){
       const jobs= await emailDLQ.getJobs();
       return jobs.map(job=>({
          id:job.id,
          originalJobId:job.data.originalJobId,
          name:job.name,
          email:job.data.data.email,
          queueName:job.data.queueName,
          failedAt:job.data.failedAt,
          failedReason:job.data.error,
          attemptsMade:job.data.attemptsMade
       }));
    }

    async retryFailedJob(jobId){
       const job=await emailDLQ.getJob(jobId);
       if(!job){
        throw new Error("job not found");
       }
       await emailQueue.add(job.name,
          job.data.data,
          job.data.options
       )
       await job.remove();
    }

    async deleteJob(jobId){
      const job=await emailDLQ.getJob(jobId);
      if(!job){
        throw new Error("job not found");
      }
      await job.remove();
    }

    async pauseQueue(){
      await emailQueue.pause();
      return{
        message:"Queue paused successfully"
      }
    }

    async resumeQueue(){
       await emailQueue.resume();
       return{
          message:"Queue resumed successfully"
       }
    }
}