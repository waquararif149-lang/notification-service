import nodemailer from "nodemailer";
import welcomeTemplate from "../templates/email/welcome.template.js";
import otpTemplate from "../templates/email/otp.template.js";
import resetPasswordTemplate from "../templates/email/resetPassword.template.js";
import welcomeFolloupTemplate from "../templates/email/welcome-followup.template.js";
import weeklyTipsTemplate from "../templates/email/weekly-tips.template.js";
import intractiveReminderTemplate from "../templates/email/intractive-reminder.template.js";


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

        console.log(`log from emailservice:${data}`);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: "Verify your email",
            html: otpTemplate(data.otp)
        };

        await this.transporter.sendMail(mailOptions);

        console.log("OTP email sent");
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
                html: intractiveReminderTemplate(data.name)
            };
            await this.transporter.sendMail(mailOptions);

            console.log("intractive reminder email sent");
    }

}

export default new EmailService();