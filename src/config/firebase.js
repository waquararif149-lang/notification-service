import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Secret exists:", fs.existsSync("/etc/secrets/firebase-admin.json"));

if (fs.existsSync("/etc/secrets")) {
  console.log("Files in /etc/secrets:", fs.readdirSync("/etc/secrets"));
}

const renderSecret = "/etc/secrets/firebase-admin.json";

const firebasePath = fs.existsSync(renderSecret)
  ? renderSecret
  : path.join(__dirname, "firebase-admin.json");

console.log("Using Firebase file:", firebasePath);

const serviceAccount = JSON.parse(
  fs.readFileSync(firebasePath, "utf8")
);

const app = initializeApp({
  credential: cert(serviceAccount),
});

export default app;