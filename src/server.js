import "./config/env.js"
import "./config/firebase.js"
import connectDB from "./config/db.js";
import app from "./app.js";

import "./workers/email.worker.js";
import "./workers/push.worker.js";
import "./workers/sms.worker.js";

const PORT = process.env.PORT || 3000;

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