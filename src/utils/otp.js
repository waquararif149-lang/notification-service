import crypto from "crypto";

export function generateOTP(){
   const otp=crypto.randomInt(100000,1000000);
   return otp;
   console.log(otp);
}