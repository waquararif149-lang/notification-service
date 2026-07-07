import bcrypt from "bcrypt";
import authRepo from "../repository/auth.repository.js";
import notificationService from "./notification.service.js";
import { generateOTP } from "../utils/otp.js";
import redisConnection from "../config/redis.js";
import generateToken from "../utils/token.js";

const authrepository=new authRepo();

export default class authService{
    async signUp(data){
        try{
        const hashedpassword=await bcrypt.hash(data.password,10);
        const userData={
            ...data,
            password:hashedpassword
        }
        const user= await authrepository.signUp(userData);
        const otp=generateOTP();
        await redisConnection.set(
            `otp${user.email}`,
             otp,
             "EX",
             300
        );
        await notificationService.sendOtpEmail({email:user.email,otp});
        await notificationService.sendSMSotp();
        console.log("otp email sent");
        return user;
      }catch(err){
        throw err;
      }
    }
   
    async verifyOtp(data){
        try{
        const storedOtp=await redisConnection.get(`otp${data.email}`);
        if(!storedOtp){
            throw new Error("otp invalid or expired")
        }
        if(storedOtp!=data.otp){
            throw new Error("invalid otp");
        }
       const user= await authrepository.verifyUser(data.email);
        await redisConnection.del(`otp${data.email}`);
        await notificationService.sendWelcomeemail(user);
        await notificationService.sendWelcomePush(
          {
           token:user.deviceTokens,
           title:`Hey ${user.name}`,
           body:"Welcome to our platform"
          }
        )
        return user;
      }catch(err){
        throw err;
      }
    }

    async forgotPassword(email){
          const user=await authrepository.findByEmail(email);
          console.log(user);
          if(!user){
            return;
          }
          const resetToken=generateToken();
          console.log("log from authservice",resetToken);
          await redisConnection.set(
            `reset:${email}`,
            resetToken,
            "EX",
            900
          );
          await notificationService.sendPasswordResetEmail({email,token:resetToken});
    }

    async resetPassword(data){
         const storedToken=await redisConnection.get(`reset:${data.email}`);
         if(!storedToken){
            throw new Error("Token expired")
         }
         if(storedToken!=data.token){
           throw new Error("invalid token");
         }
         const hashedpassword=await bcrypt.hash(data.password,10);
         const user=await authrepository.updatePassword(data.email,hashedpassword);
         await redisConnection.del(`reset:${data.email}`);
    }
}