const otpGenerator = require("otp-generator");
const sendEmail = require("./mailSender");
const { db } = require("./db");
const OtpException = require("../exception/OtpException");

// Function to send OTP
const generateAndSendOtp = async (userId, userEmail) => {
  const otpCode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 5);

  console.log("Current time:", new Date());
  console.log("OTP expiresAt:", expiresAt);
  console.log("otpCode: ", otpCode);

  await db.otp.create({
    data: {
      userId: userId,
      code: otpCode,
      expiresAt: expiresAt,
    },
  });

  await sendEmail(userEmail, "title", otpCode);
};

// verify OTP
const verifyOtp = async (userId, otpCode) => {
  const otpRecord = await db.otp.findFirst({
    where: {
      userId: userId,
      code: otpCode,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  console.log("otpRecord: \n", otpRecord);

  if (!otpRecord) {
    throw new OtpException("OTP is invaild or has expired");
  }

  await db.otp.update({
    where: {
      id: otpRecord.id,
    },
    data: {
      expiresAt: new Date(),
    },
  });

  return true;
};

module.exports = { generateAndSendOtp, verifyOtp };
