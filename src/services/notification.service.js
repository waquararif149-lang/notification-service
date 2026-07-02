import { emailQueue } from "../queue/email.queue.js"
class notificationSerivce {
    async sendWelcomeemail(user) {
        await emailQueue.add("welcome-email",
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
}

export default new notificationSerivce();