import nodemailer from "nodemailer";


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// })

class EmailService {
    async sendWelcomeEmail(data) {
        try {
            console.log("Inside sendWelcomeEmail");
            console.log(process.env.EMAIL_USER);
            console.log(process.env.EMAIL_PASS);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: "Welcome to our Platform",
                text: `Hello ${data.name}, welcome to our platform!`
            };

            const info = await transporter.sendMail(mailOptions);

            console.log("Welcome email sent");
            // console.log(info);

        } catch (err) {
            console.error("Error while sending email:");
            console.error(err);
            throw err;
        }
    }
}

export default new EmailService();