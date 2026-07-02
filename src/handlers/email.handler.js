import emailService from "../services/email.service.js";

const handlers={
    "welcome-email":emailService.sendWelcomeEmail.bind(emailService)
}

export const handleEmailjob=async(job)=>{
   const handler=handlers[job.name];
   if(!handler){
    throw new Error(`unknow job type:${job.name}`);
   }
   await handler(job.data);
}