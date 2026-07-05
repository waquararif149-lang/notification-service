import smsService from "../services/sms.service.js";
import { SMS_JOBS } from "../utils/job.constants.js";


const handlers={
    [SMS_JOBS.OTP]:smsService.sendOtp.bind(smsService)
}

export const handleSMSjob=async(job)=>{
   const handler=handlers[job.name];
   if(!handler){
    throw new Error(`unknow job type:${job.name}`);
   }
   await handler();
}