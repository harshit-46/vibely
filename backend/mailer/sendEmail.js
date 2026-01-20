const nodemailer = require("nodemailer");

module.exports = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Vibely" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};
