import {Queue} from "bullmq";
import redisConnection from "../config/redis.js";

export const pushQueue=new Queue("push-queue",{connection:redisConnection});