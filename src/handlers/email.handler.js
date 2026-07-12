import emailService from "../services/email.service.js";
import { EMAIL_JOBS } from "../utils/job.constants.js";

const handlers={
    [EMAIL_JOBS.WELCOME]:emailService.sendWelcomeEmail.bind(emailService),
    [EMAIL_JOBS.OTP]:emailService.sendOtpEmail.bind(emailService),
    [EMAIL_JOBS.PASSWORD_RESET]:emailService.sendPasswordResetEmail.bind(emailService),
    [EMAIL_JOBS.WELCOME_FOLLOWUP]:emailService.sendWelcomeFollowupEmail.bind(emailService),
    [EMAIL_JOBS.WEEKLY_TIPS]:emailService.sendWeeklyTipsEmail.bind(emailService),
    [EMAIL_JOBS.INACTIVE_REMINDER]:emailService.sendInactiveReminderEmail.bind(emailService)
}

export const handleEmailjob=async(job)=>{
   const handler=handlers[job.name];
   if(!handler){
    throw new Error(`unknow job type:${job.name}`);
   }
   await handler(job.data);
   console.log("email service called from handler");
}