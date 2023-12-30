const express = require("express");
const { ErrorCode } = require("../exception/root.js");
const jsonwebtoken = require("jsonwebtoken");
const UnauthorizedException = require("../exception/unauthorized.js");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.accesstoken;

  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET);
    req.voter = payload;
    next();
  } catch (err) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

module.exports = { isAuthenticated };
