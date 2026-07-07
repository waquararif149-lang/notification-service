import pushService from "../services/push.service.js";
import {PUSH_JOBS} from "../utils/job.constants.js";


const handlers={
    [PUSH_JOBS.WELCOME]:pushService.sendPushNotification.bind(pushService)
}

export const handlePushJob=async(job)=>{
   const payload = job.data?.data ?? job.data;
   const handler=handlers[job.name];
   if(!handler){
    throw new Error(`unknow job type:${job.name}`);
   }
   await handler(payload);
}