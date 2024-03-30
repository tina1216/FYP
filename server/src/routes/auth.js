const express = require("express");
const {
  signup,
  login,
  verifyOptForLogin,
  refreshToken,
  revokeRefreshTokens,
  logout,
} = require("../controllers/auth.js");
const errorHandler = require("../../errorHandler.js");

const authRoutes = express.Router();

authRoutes.post("/login", errorHandler(login));

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/refreshToken", errorHandler(refreshToken));
authRoutes.post("/revokeRefreshTokens", errorHandler(revokeRefreshTokens));
authRoutes.post("/logout", errorHandler(logout));
authRoutes.post("/verify", errorHandler(verifyOptForLogin));

module.exports = authRoutes;
