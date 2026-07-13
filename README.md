# 🚀 Notification System

A production-inspired notification system built with **Node.js**, **Express.js**, **MongoDB**, **BullMQ**, **Redis**, **Firebase Cloud Messaging**, and **Resend**. The project demonstrates asynchronous job processing, delayed notifications, queue management, retry mechanisms, and scalable backend architecture.

---

## ✨ Features

### 👤 User Authentication
- User Registration
- Email OTP Verification
- Secure Password Hashing using bcrypt
- Forgot Password
- Reset Password using secure token

---

### 📧 Email Notifications
- OTP Verification Email
- Welcome Email
- Password Reset Email
- Delayed Welcome Follow-up Email
- Weekly Tips Email
- Inactive User Reminder Email

---

### 📱 Push Notifications
- Welcome Push Notification
- Firebase Cloud Messaging (FCM)
- Device Token Management

---

### ⚡ Queue Management
- BullMQ powered asynchronous job processing
- Redis backed queues
- Automatic retries with exponential backoff
- Delayed Jobs
- Dead Letter Queue (DLQ)
- Bull Board Dashboard for queue monitoring

---

### 🛠 Production Features
- Dockerized Application
- Redis Integration
- MongoDB Atlas
- Resend Email Service
- Firebase Admin SDK
- Environment Variable Management
- Error Handling
- Modular Architecture

---

# 🏗 Architecture

```
                Client
                   │
                   ▼
            Express REST API
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
    MongoDB Atlas         BullMQ Queue
                                 │
                                 ▼
                             Redis
                                 │
         ┌───────────┬───────────┴───────────┐
         ▼           ▼                       ▼
   Email Worker   SMS Worker          Push Worker
         │                               │
         ▼                               ▼
     Resend API              Firebase Cloud Messaging
```



# ⚙ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Queue & Caching
- BullMQ
- Redis (Upstash)

### Notifications
- Resend
- Firebase Cloud Messaging

### Authentication
- email-otp
- bcrypt

### Deployment
- Docker
- Render

### Other Tools
- Bull Board
- Postman
- Git
- GitHub

---

# 📂 Project Structure

```
src
│
├── config
├── controllers
├── handlers
├── middleware
├── models
├── queues
├── repository
├── routes
├── services
├── templates
├── utils
├── workers
└── server.js
```

---

# 🔄 Notification Flow

### User Signup

```
Signup Request
      │
      ▼
Create User
      │
      ▼
Generate OTP
      │
      ▼
Store OTP in Redis
      │
      ▼
Add Email Job to BullMQ
      │
      ▼
Worker Processes Job
      │
      ▼
Resend API
      │
      ▼
User receives OTP Email
```

---

### OTP Verification

```
Verify OTP
      │
      ▼
Mark User Verified
      │
      ▼
Queue Welcome Email
      │
      ▼
Queue Welcome Push Notification
      │
      ▼
Schedule Welcome Follow-up
      │
      ▼
Schedule Weekly Tips
      │
      ▼
Schedule Inactive Reminder
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/<your-username>/notification-system.git
```

```bash
cd notification-system
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=

MONGO_URL=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

EMAIL_PROVIDER=RESEND
RESEND_API_KEY=

FIREBASE_ADMIN_JSON=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

---

## Run Locally

```bash
npm start
```

---

## Using Docker

```bash
docker compose up --build
```

---

# 📊 Queue Monitoring

Bull Board Dashboard

```
http://localhost:3000/admin/queues
```

---

# 🔐 Security

- Password Hashing using bcrypt
- JWT Authentication
- OTP Expiration
- Secure Password Reset Token
- Environment Variable Management

---

# 📌 Future Improvements

- SMS Provider Integration (Twilio)
- Notification Preferences
- Web Push Notifications
- Rate Limiting
- Email Templates Dashboard
- Notification Analytics
- Multi-language Email Templates
- Kubernetes Deployment
- CI/CD Pipeline using GitHub Actions

---

# 📝 Deployment Note

This project demonstrates a production-style queue architecture using BullMQ.

In production, Email, SMS, and Push workers should run as **independent background worker services**.

Since Render's free tier does not provide free Background Workers, the worker processes are started from the main application process for deployment purposes.

---

# 👨‍💻 Author

**Arif Waquar**

Backend Developer

- Node.js
- Express.js
- MongoDB
- BullMQ
- Redis
- Docker
- Firebase
- Resend
