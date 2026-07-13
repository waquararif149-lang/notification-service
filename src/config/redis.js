import Redis from "ioredis";

const redisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    maxRetriesPerRequest: null,
};

// Only use password if it exists
if (process.env.REDIS_PASSWORD) {
    redisOptions.password = process.env.REDIS_PASSWORD;
}

// Only enable TLS when using Upstash/Render
if (process.env.REDIS_TLS === "true") {
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