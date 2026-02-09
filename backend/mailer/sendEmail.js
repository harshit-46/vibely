const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({ to, subject, html }) => {
    try {
            await resend.emails.send({
            from: `WeSnap <no-reply@${MAIL_DOMAIN}>`,
            to,
            subject,
            html,
            tracking: {
                clicks: false,
                opens: false,
            },
        });
    } catch (err) {
        console.error("RESEND ERROR:", err);
        throw err;
    }
};