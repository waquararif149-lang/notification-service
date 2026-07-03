import nodemailer from "nodemailer";


class EmailService {

   constructor(){
    this.transporter=nodemailer.createTransport({
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
                text: `Hello ${data.name}, welcome to our platform!`
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
        text: `Your OTP is ${data.otp}. It expires in 5 minutes.`
    };

    await this.transporter.sendMail(mailOptions);

    console.log("OTP email sent");
}
}

export default new EmailService();