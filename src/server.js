import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});
const PORT=process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();