import Redis from "ioredis";

const isLocal = !process.env.REDIS_PASSWORD;

const redisOptions = {
    host: isLocal ? "localhost" : process.env.REDIS_HOST,
    port: isLocal ? 6379 : Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
};

if (!isLocal && process.env.REDIS_PASSWORD) {
    redisOptions.password = process.env.REDIS_PASSWORD;
}

if (!isLocal) {
    redisOptions.tls = {};
}

const redisConnection = new Redis(redisOptions);

redisConnection.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisConnection.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

export default redisConnection;






// import Redis from "ioredis";

// const redisConnection = new Redis({
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT),
//     password: process.env.REDIS_PASSWORD,
//     tls: {},
//     maxRetriesPerRequest: null,
// });

// redisConnection.on("connect", () => {
//     console.log("✅ Redis Connected");
// });

// redisConnection.on("error", (err) => {
//     console.error("❌ Redis Error:", err);
// });

// export default redisConnection;