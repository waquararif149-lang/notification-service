import nodemailer from "nodemailer";
import welcomeTemplate from "../templates/email/welcome.template.js";
import otpTemplate from "../templates/email/otp.template.js";
import resetPasswordTemplate from "../templates/email/resetPassword.template.js";
import welcomeFolloupTemplate from "../templates/email/welcome-followup.template.js";
import weeklyTipsTemplate from "../templates/email/weekly-tips.template.js";
import inactiveReminderTemplate from "../templates/email/inactive-reminder.template.js";
import resend from "../config/resend.js";

class EmailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    async sendWelcomeEmail(data) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: "Welcome to our Platform",
                html: welcomeTemplate(data.name)
            };

            await this.transporter.sendMail(mailOptions);

            console.log("Welcome email sent");

        } catch (err) {
            console.error("Error while sending email:");
            console.error(err);
            throw err;
        }
    }

    async sendOtpEmail(data) {
        try {
            console.log(`log from emailservice:${data}`);

            if (!data.email) {
                throw new Error("Email recipient not defined");
            }

            const mailOptions = {
                from: "Notification System <onboarding@resend.dev>",
                to: data.email,
                subject: "Verify your email",
                html: otpTemplate(data.otp)
            };

            // await this.transporter.sendMail(mailOptions);
            await resend.emails.send(mailOptions);

            console.log("OTP email sent");
        } catch (err) {
            console.error("Error while sending OTP email:");
            console.error(err);
            throw err;
        }
    }

    async sendPasswordResetEmail(data) {
        const resetLink = `https://localhost:3000/reset-password?token=${data.token}&email=${data.email}`;
        console.log("log from emailservice",data.token);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: "Reset Password",
            html:resetPasswordTemplate(resetLink)
        };

        await this.transporter.sendMail(mailOptions);
        console.log("resetPassword email sent");
    }

    async sendWelcomeFollowupEmail(data){
       const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: "Getting Started with Notification System 🚀",
                html: welcomeFolloupTemplate(data.name)
            };
            await this.transporter.sendMail(mailOptions);

            console.log("Welcome followup email sent");
    }

    async sendWeeklyTipsEmail(data){
        const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: "Your Weekly Notification Tips 📬",
                html: weeklyTipsTemplate(data.name)
            };
            await this.transporter.sendMail(mailOptions);

            console.log("weekly email sent");
    }

    async sendInactiveReminderEmail(data){
        const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: "We Miss You! Come Back to Notification System 👋",
                html: inactiveReminderTemplate(data.name)
            };
            await this.transporter.sendMail(mailOptions);

            console.log("intractive reminder email sent");
    }

}

export default new EmailService();