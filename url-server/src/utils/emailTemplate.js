const getOtpTemplate = (fullName, otp) => {
    const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formattedOtp =
        otp.toString().replace(/(\d{3})(\d{3})/, "$1 $2");

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f0e8; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f0e8; padding: 48px 16px;">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">

                        <!-- Torn top edge -->
                        <tr>
                            <td style="line-height: 0; font-size: 0; padding: 0;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5; border-radius: 50% 0 0 0;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5; border-radius: 0 50% 0 0;"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Main receipt body -->
                        <tr>
                            <td style="background-color: #fffdf5;">

                                <!-- Header -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 32px 40px 20px; border-bottom: 2px dashed #e5e1d0;">
                                            <p style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #1c1917; letter-spacing: -0.5px;">&#10022; SHORTIFY</p>
                                            <p style="margin: 0; font-size: 11px; font-weight: 500; letter-spacing: 2px; color: #a8a29e; text-transform: uppercase;">Account Verification</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Receipt rows -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="padding: 16px 40px 0;">

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">
                                                <tr>
                                                    <td style="font-size: 12px; color: #a8a29e; padding: 4px 0; letter-spacing: 0.3px;">To</td>
                                                    <td align="right" style="font-size: 12px; color: #1c1917; font-weight: 500; padding: 4px 0;">${fullName}</td>
                                                </tr>
                                            </table>

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">
                                                <tr>
                                                    <td style="font-size: 12px; color: #a8a29e; padding: 4px 0; letter-spacing: 0.3px;">Date</td>
                                                    <td align="right" style="font-size: 12px; color: #1c1917; font-weight: 500; padding: 4px 0;">${date}</td>
                                                </tr>
                                            </table>

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 6px;">
                                                <tr>
                                                    <td style="font-size: 12px; color: #a8a29e; padding: 4px 0; letter-spacing: 0.3px;">Purpose</td>
                                                    <td align="right" style="font-size: 12px; color: #1c1917; font-weight: 500; padding: 4px 0;">Email verification</td>
                                                </tr>
                                            </table>

                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                                                <tr>
                                                    <td style="font-size: 12px; color: #a8a29e; padding: 4px 0; letter-spacing: 0.3px;">Expires in</td>
                                                    <td align="right" style="font-size: 12px; color: #1c1917; font-weight: 500; padding: 4px 0;">10 minutes</td>
                                                </tr>
                                            </table>

                                        </td>
                                    </tr>
                                </table>

                                <!-- OTP block -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 0 40px; border-top: 2px dashed #e5e1d0; border-bottom: 2px dashed #e5e1d0;">
                                            <p style="margin: 0; padding: 4px 0 2px; font-size: 10px; letter-spacing: 2px; color: #a8a29e; text-transform: uppercase; font-weight: 500;">Your one-time code</p>
                                            <p style="margin: 0; padding: 10px 0 14px; font-family: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 42px; font-weight: 800; color: #1c1917; letter-spacing: 10px;">${formattedOtp}</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Sub note -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 14px 40px 0;">
                                            <p style="margin: 0; font-size: 11px; color: #a8a29e; letter-spacing: 0.3px;">Single use &middot; Do not share this code</p>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Security notice -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="padding: 16px 40px 0;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f0e8; border-radius: 8px;">
                                                <tr>
                                                    <td style="padding: 12px 14px;">
                                                        <p style="margin: 0; font-size: 11.5px; line-height: 1.6; color: #78716c;">
                                                            If you did not request this code, you can safely disregard this email. Your account remains secure as long as you do not share this code with anyone.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Footer -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 20px 40px 32px; margin-top: 20px; border-top: 2px dashed #e5e1d0;">
                                            <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                                                <tr>
                                                    <td align="center">
                                                        <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1c1917;">Shortify, Inc.</p>
                                                        <p style="margin: 0 0 4px 0; font-size: 11px; color: #a8a29e;">shortify.io &middot; hello@shortify.io</p>
                                                        <p style="margin: 0; font-size: 11px; color: #c7bfb0;">&copy; 2026 &middot; All rights reserved</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>

                        <!-- Torn bottom edge -->
                        <tr>
                            <td style="line-height: 0; font-size: 0; padding: 0;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5; border-radius: 0 0 0 50%;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #f5f0e8;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5;"></td>
                                        <td width="10%" style="height: 12px; background-color: #fffdf5; border-radius: 0 0 50% 0;"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Below receipt note -->
                        <tr>
                            <td align="center" style="padding: 16px 0 0;">
                                <p style="margin: 0; font-size: 10px; color: #b9b0a2; letter-spacing: 0.5px;">Automated transactional message &middot; Do not reply</p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

export default getOtpTemplate