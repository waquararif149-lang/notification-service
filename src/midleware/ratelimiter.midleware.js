import redisConnection from "../config/redis.js";

export const rateLimiter=({
    keyGenerator,
    limit,
    windowInSeconds
})=>{
    return async(req,res,next)=>{
      try{
        //step-1 generate unique identifire
        const identifire=keyGenerator(req);

        if(!identifire){
            res.status(400).json({
                success:false,
                message:"unable to identify client for rate limiting"
            })
        }
        //step-2 create redis key
        const redisKey=`rate:${req.path}:${identifire}`;
        //step-3 increment req count
        const count=await redisConnection.incr(redisKey);
        //step-4 set expiry only on first request
        if(count==1){
            await redisConnection.expire(redisKey,windowInSeconds);
        }
        //step-5 check limit
        if(count>limit){
           return res.status(404).json({
                success:false,
                message:"Too many requests. Please try again later."
            })
        }
        next();
      }catch(err){
        next(err);
      }
    }
}