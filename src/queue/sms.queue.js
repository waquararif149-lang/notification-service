import {Queue} from "bullmq";
import redisConnection from "../config/redis.js";

export const smsQueue=new Queue("sms-queue",{connection:redisConnection});