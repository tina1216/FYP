const { hashSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jsonwebtoken = require("jsonwebtoken");

const config = require("../config/config");
const badRequestsException = require("../exception/badRequests.js");
const ErrorCode = require("../exception/root.js");
const { UnprocessableEntity } = require("../exception/validation.js");
const notFoundException = require("../exception/notFound.js");

const { generateTokens } = require("../utils/jwt.js");
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} = require("../services/auth.js");
const {
  findVoterByIdNumber,
  createVoterByIdNumberAndPassword,
  findVoterById,
} = require("../services/voters.js");
const { hashToken } = require("../utils/hashToken.js");

// signup
const signup = async (req, res) => {
  const { idNumber, password } = req.body;

  let voter = await findVoterByIdNumber(idNumber);

  if (voter) {
    throw new badRequestsException("User already exists.", ErrorCode.USER_ALREADY_EXISTS);
  }
  const jti = uuidv4();
  voter = await createVoterByIdNumberAndPassword({ idNumber, password });
  const { accessToken, refreshToken } = generateTokens(voter, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, voterId: voter.id });

  res.json({
    voter,
    accessToken,
    refreshToken,
  });
};

// login
const login = async (req, res) => {
  const { idNumber, password } = req.body;

  const existingVoter = await findVoterByIdNumber(idNumber);

  if (!existingVoter) {
    throw new notFoundException("Account not found.", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, existingVoter.password)) {
    throw new badRequestsException("Incorrect password or ID number", ErrorCode.INCORRECT_PASSWORD);
  }

  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(existingVoter, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, voterId: existingVoter.id });

  res.json({
    existingVoter,
    accessToken,
    refreshToken,
  });
};

// /profile
const profile = async (req, res) => {
  const voterId = req.voter.voterId;
  const voter = await findVoterById(voterId);
  delete voter.password;
  res.send(voter);
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

  const voter = await findVoterByIdNumber(payload.voterId);

  if (!voter) {
    throw new unauthorisedException("Unauthorized", ErrorCode.UNAUTHORIZED);
  }

  await deleteRefreshToken(savedRefreshToken.id);

  const jti = uuidv4();
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(voter, jti);
  await addRefreshTokenToWhitelist({
    jti,
    refreshToken: newRefreshToken,
    voterId: voter.id,
  });

  res.json({
    accessToken,
    refreshToken: newRefreshToken,
  });
};

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
const revokeRefreshTokens = async (req, res) => {
  const { voterId } = req.body;
  await revokeTokens(voterId);
  res.json({ message: `Tokens revoked for user with id #${voterId}` });
};

module.exports = { login, signup, profile, refreshToken, revokeRefreshTokens };
