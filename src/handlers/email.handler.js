import emailService from "../services/email.service.js";
import { EMAIL_JOBS } from "../utils/job.constants.js";

const handlers={
    [EMAIL_JOBS.WELCOME]:emailService.sendWelcomeEmail.bind(emailService)
}

export const handleEmailjob=async(job)=>{
   const handler=handlers[job.name];
   if(!handler){
    throw new Error(`unknow job type:${job.name}`);
   }
   await handler(job.data);
}