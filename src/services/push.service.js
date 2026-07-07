// import "../config/firebase.js"
import { getMessaging } from "firebase-admin/messaging";

class PushService {

    async sendPushNotification(data) {
      const {token,title,body}=data ?? {};
      console.log("log from pushservice",data);

      if (!token) {
        throw new Error("Push token is missing")
      }

        const message = {
            token,

            notification: {
                title,
                body
            }
        };

        const response = await getMessaging().send(message);

        console.log("Push notification sent:", response);

        return response;
    }
}

export default new PushService();