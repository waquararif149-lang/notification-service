import { emailQueue } from "../queue/email.queue.js"
import { EMAIL_JOBS } from "../utils/job.constants.js";
class notificationSerivce {
    async sendWelcomeemail(user) {
        await emailQueue.add(EMAIL_JOBS.WELCOME,
            {
                email: user.email,
                name: user.name
            },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 2000
                },
                removeOnComplete: true,
                priority: 1
            }
        )
    }

    async sendOtpEmail(data){
      await emailQueue.add(EMAIL_JOBS.OTP,
        data,
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:2000
            },
            removeOnComplete:true
        }
      )
    }
}

export default new notificationSerivce();