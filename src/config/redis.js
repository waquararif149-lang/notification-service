import ioredis from "ioredis"

const redisConnection=new ioredis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    maxRetriesPerRequest:null
})

export default redisConnection;