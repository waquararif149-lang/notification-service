
class smsService{

    async sendOtp(){
        console.log({
         subject:"sending SMS",
         To:9508910946,
         Message:"your otp is 123456"
      })
      console.log("otp is sent through SMS");
    }
}

export default new smsService();