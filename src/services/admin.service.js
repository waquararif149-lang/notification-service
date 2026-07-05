import { emailQueue } from "../queue/email.queue.js";

export default class adminService{

    async getQueueStats(){
        return await emailQueue.getJobCounts();
    }

    async getFailedJobs(){
       const jobs= await emailQueue.getFailed();
       return jobs.map(job=>({
          id:job.id,
          name:job.name,
          data:job.data,
          failedReason:job.failedReason,
          attemptsMade:job.attemptsMade
       }));
    }

    async retryFailedJob(jobId){
       const job=await emailQueue.getJob(jobId);
       const state=job.getState();
       if(!job){
        throw new Error("job not found");
       }
       if(state!="failed"){
         throw new Error("Only failed jobs can be retried")
       }
       await job.retry();
    }

    async deleteJob(jobId){
      const job=await emailQueue.getJob(jobId);
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