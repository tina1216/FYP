const { hashSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jsonwebtoken = require("jsonwebtoken");

const config = require("../config/config");
const badRequestsException = require("../exception/badRequests.js");
const ErrorCode = require("../exception/root.js");
const { UnprocessableEntity } = require("../exception/validation.js");
const notFoundException = require("../exception/notFound.js");
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} = require("../services/auth.js");
const {
  findUserByUserId,
  createUserByUserIdAndPassword,
  findUserById,
} = require("../services/users.js");
const { generateTokens } = require("../utils/jwt.js");
const { hashToken } = require("../utils/hashToken.js");
const { generateAndSendOtp, verityOtp } = require("../utils/otp.js");

// signup
const signup = async (req, res) => {
  const { userId, password, email } = req.body;

  let user = await findUserByUserId(userId);

  if (user) {
    throw new badRequestsException("User already exists.", ErrorCode.USER_ALREADY_EXISTS);
  }
  const jti = uuidv4();
  user = await createUserByUserIdAndPassword({ userId, password, email });
  const { accessToken, refreshToken } = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

  res.json({
    user,
    accessToken,
    refreshToken,
  });
};

// login
const login = async (req, res) => {
  const { userId, password } = req.body;

  const existingUser = await findUserByUserId(userId);

  if (!existingUser) {
    throw new notFoundException("Account not found.", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, existingUser.password)) {
    throw new badRequestsException("Incorrect password or ID number", ErrorCode.INCORRECT_PASSWORD);
  }

  await generateAndSendOtp(existingUser.id, existingUser.email);
};

// verify OTP for login
const verifyOptForLogin = async (req, res) => {
  const { userId, optCode } = req.body;

  const isValid = await verityOtp(userId, optCode);

  if (!isValid) {
    throw new OtpException("OTP is invaild or has expired");
  }

  const user = await findUserById(userId);
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });
  const hasVoted = user.elections.some((electionUser) => electionUser.hasVoted);

  res.json({
    user: {
      ...user,
      hasVoted,
    },
    accessToken,
    refreshToken,
  });
};

//logout
const logout = async (req, res) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
const revokeRefreshTokens = async (req, res) => {
  console.log(`Revoking tokens for userId: ${userId}`);
  const { userId } = req.body;
  await revokeTokens(userId);
  res.json({ message: `Tokens revoked for user with id #${userId}` });
};

//refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400);
    throw new Error("Missing refresh token.");
  }

  const payload = jsonwebtoken.verify(refreshToken, config.JWT_REFRESH_SECRET);
  const savedRefreshToken = await findRefreshTokenById(payload.jti);

  if (!savedRefreshToken || savedRefreshToken.revoked === true) {
    throw new unauthorisedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  const hashedToken = hashToken(refreshToken);

  if (hashedToken !== savedRefreshToken.hashedToken) {
    throw new unauthorisedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  const user = await findUserByUserId(payload.userId);

  if (!user) {
    throw new unauthorisedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  await deleteRefreshToken(savedRefreshToken.id);

  const jti = uuidv4();
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
  await addRefreshTokenToWhitelist({
    jti,
    refreshToken: newRefreshToken,
    userId: user.id,
  });

  res.json({
    accessToken,
    refreshToken: newRefreshToken,
  });
};

module.exports = { signup, login, verifyOptForLogin, refreshToken, revokeRefreshTokens, logout };
