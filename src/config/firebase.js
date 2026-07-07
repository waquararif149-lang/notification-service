import { initializeApp, cert } from "firebase-admin/app";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
    readFileSync(new URL("./firebase-admin.json", import.meta.url), "utf8")
);

const app = initializeApp({
    credential: cert(serviceAccount)
});

export default app;