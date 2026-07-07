import "./config/env.js"
import "./config/firebase.js"
import connectDB from "./config/db.js";
import app from "./app.js";

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