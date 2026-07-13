import { emailQueue } from "../queue/email.queue.js"
import { pushQueue } from "../queue/push.queue.js";
import { smsQueue } from "../queue/sms.queue.js";
import { EMAIL_JOBS,PUSH_JOBS, SMS_JOBS } from "../utils/job.constants.js";
class notificationSerivce {
    async sendWelcomeemail(user,options={}) {
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
                priority: 1,
                ...options
            }
        )
    }

    async sendOtpEmail(data){
        console.log("adding email job")
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
      console.log("email job adedd")
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
            delay:60000,
            attempts:3,
                backoff:{
                    type:"exponential",
                    delay:2000
                },
                removeOnComplete:true
          }
        )
    }

    async sendWelcomeFollowup(data){
        await emailQueue.add(data.jobName,
            {
                email: data.user.email,
                name: data.user.name
            },
            {
            delay:data.delay,
            attempts:3,
                backoff:{
                    type:"exponential",
                    delay:2000
                },
                removeOnComplete:true
          }
        )
    }

    async sendWeeklyTips(data){
        await emailQueue.add(data.jobName,
            {
                email: data.user.email,
                name: data.user.name
            },
            {
            delay:data.delay,
            attempts:3,
                backoff:{
                    type:"exponential",
                    delay:2000
                },
                removeOnComplete:true
          }
        )
    }

    async sendInactiveReminder(data){
        await emailQueue.add(data.jobName,
            {
                email: data.user.email,
                name: data.user.name
            },
            {
            delay:data.delay,
            attempts:3,
                backoff:{
                    type:"exponential",
                    delay:2000
                },
                removeOnComplete:true
          }
        )
    }

    //WRITING THESE THREE METHODS AGAIN AND AGAIN INSTEAD YOU CAN ALSO MAKE 
    //A SINGLE FUNCTION CALLED scheduleEmail AND ACCEPT THREE ARGUMENTS 
    //JOBNAME,USER,DELAY
    // async scheduleEmail(data){
    //     await emailQueue.add(data.jobName,
    //         {
    //             email: data.user.email,
    //             name: data.user.name
    //         },
    //         {
    //         delay:data.delay,
    //         attempts:3,
    //             backoff:{
    //                 type:"exponential",
    //                 delay:2000
    //             },
    //             removeOnComplete:true
    //       }
    //     )
    // }
}

export default new notificationSerivce();