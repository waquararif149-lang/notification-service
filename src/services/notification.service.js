import { emailQueue } from "../queue/email.queue.js"
import { pushQueue } from "../queue/push.queue.js";
import { smsQueue } from "../queue/sms.queue.js";
import { EMAIL_JOBS, PUSH_JOBS, SMS_JOBS } from "../utils/job.constants.js";
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

    async sendPasswordResetEmail(data){
        await emailQueue.add(EMAIL_JOBS.PASSWORD_RESET,
          data,
          {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:2000,
            },
            removeOnComplete:true
          }
        )
    }

    async sendSMSotp(){
        await smsQueue.add(SMS_JOBS.OTP,
            {},
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

    async sendWelcomePush(data){
        await pushQueue.add(PUSH_JOBS.WELCOME,
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