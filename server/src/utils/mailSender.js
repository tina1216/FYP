const nodemailer = require("nodemailer");

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (email, subject, otpCode) => {
  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your login</title>
  </head>
  <body
    style="
      font-family: Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      style="width: 100%; border-collapse: collapse; background-color: #f3f4f6"
    >
      <tr>
        <td align="center" style="padding: 16px">
          <table
            role="presentation"
            style="
              max-width: 600px;
              width: 100%;
              border-collapse: collapse;
              background-color: #ffffff;
              text-align: left;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <tr>
              <td style="padding: 40px">
                <div style="padding-bottom: 20px; text-align: center">
                  <h1 style="text-align: center; color: #0369a1">VoiceBox</h1>
                </div>
                <h1 style="margin-top: 0; margin-bottom: 16px; font-size: 24px; color: #020617">
                  Verification Code
                </h1>
                <p style="margin-bottom: 16px; color: #4b5563">
                  Please use the verification code below to sign in.
                </p>
                <div
                  style="
                    align-items: center;
                    background-color: #f3f4f6;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding: 16px;
                  "
                >
                  <p
                    style="margin-bottom: 16px; font-size: 24px; font-weight: bold; color: #020617"
                  >
                    ${otpCode}
                  </p>
                </div>
                <p style="margin-bottom: 16px; color: #4b5563">
                  If you didn't request this, you can ignore this email.
                </p>
                <br />
                <p style="margin-bottom: 16px; color: #4b5563">Thanks,</p>
                <p style="margin-bottom: 16px; color: #4b5563">The VoiceBox team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
  try {
    await transpoter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent successfully.");
  } catch (err) {
    console.log("Error in sending email: ", err);
  }
};

module.exports = sendEmail;
