const resetEmailHtml = (resetUrl, userName ) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="padding: 40px 16px;">
                <table width="100%" max-width="480" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#ffffff; border-radius:8px; padding:32px; max-width:480px;">

                <!-- Header -->
                <tr>
                    <td style="text-align:center; padding-bottom:24px;">
                    <h1 style="margin:0; font-size:22px; color:#111;">
                        Reset your WeSnap password
                    </h1>
                </td>
            </tr>

            <!-- Body -->
            <tr>
                <td style="font-size:15px; color:#444; line-height:1.6;">
                    <p style="margin-top:0;">Hi ${userName},</p>

                    <p>
                        We received a request to reset your WeSnap password.
                        Click the button below to set a new one.
                    </p>

                <!-- Button -->
                <p style="text-align:center; margin:32px 0;">
                    <a href="${resetUrl}"
                        style="
                        background:#111;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:6px;
                        display:inline-block;
                        font-weight:600;
                        ">
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will expire in <strong>10 minutes</strong>.
                    If you didn’t request a password reset, you can safely ignore this email.
                </p>

                <p style="margin-bottom:0;">
                    — WeSnap Team
                    </p>
            </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding-top:24px; font-size:12px; color:#888; text-align:center;">
                    If the button doesn’t work, copy and paste this link into your browser:
                    <br />
                    <a href="${resetUrl}" style="color:#888; word-break:break-all;">
                    ${resetUrl}
                </a>
                </td>
                </tr>
                </table>
            </td>
            </tr>
        </table>
    </body>
</html>
`;

module.exports = resetEmailHtml;