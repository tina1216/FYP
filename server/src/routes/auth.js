const express = require("express");
const {
  login,
  signup,
  refreshToken,
  revokeRefreshTokens,
  logout,
} = require("../controllers/auth.js");
const errorHandler = require("../../errorHandler.js");
const { isAuthenticated } = require("../middlewares/auth.js");

const authRoutes = express.Router();

authRoutes.post("/login", errorHandler(login));
authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/refreshToken", errorHandler(refreshToken));
authRoutes.post("/revokeRefreshTokens", errorHandler(revokeRefreshTokens));
authRoutes.post("/logout", errorHandler(logout));

module.exports = authRoutes;
