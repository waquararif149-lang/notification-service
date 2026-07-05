import adminService from "../services/admin.service.js"

export default class adminControler{
 
    constructor(){
        this.adminservice=new adminService();
    }

    async getQueueStats(req,res){
        try{
          const result=await this.adminservice.getQueueStats();
          res.status(200).json({
            success:"true",
            result
          })
        }catch(err){
          res.status(400).json({
            success:"false",
            message:err.message
          })
        }
    }

    async getFailedJobs(req,res){
        try{
          const jobs=await this.adminservice.getFailedJobs();
          res.status(200).json({
            success:"true",
            jobs
          })
        }catch(err){
           res.status(400).json({
            success:"false",
            message:err.message
          })
        }
    }

    async retryFailedJob(req,res){
        try{
         const {jobId}=req.params;
         await this.adminservice.retryFailedJob(jobId);
         res.status(200).json({
            success:"true",
            message:"job retry scuccessfully"
         })
        }catch(err){
          res.status(404).json({
            success:"false",
            message:err.message
          })
        }
    }

    async deleteJob(req,res){
        try{
         const {jobId}=req.params;
         await this.adminservice.deleteJob(jobId);
         res.status(200).json({
            success:"true",
            message:"job deleted successfully"
         })
        }catch(err){
          res.status(404).json({
            success:"false",
            message:err.message
          })
        }
    }

    async pauseQueue(req,res){
        try{
          await this.adminservice.pauseQueue();
          res.status(200).json({
            success:"true",
            message:"job is paused"
         })
        }catch(err){
          res.status(400).json({
            success:"false",
            message:err.message
          })
        }
    }

    async resumeQueue(req,res){
        try{
          await this.adminservice.resumeQueue();
          res.status(200).json({
            success:"true",
            message:"job is resumed"
         })
        }catch(err){
          res.status(400).json({
            success:"false",
            message:err.message
          })
        }
    }
}