import bcrypt from "bcrypt";
import authRepo from "../repository/auth.repository.js";
import notificationService from "./notification.service.js";
import { generateOTP } from "../utils/otp.js";
import redisConnection from "../config/redis.js";

const authrepository=new authRepo();

export default class authService{
    async signUp(data){
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
        console.log("otp email sent");
        return user;
    }
   
    async verifyOtp(data){
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
        return user;
    }
}