const express = require("express");
const authRoutes = require("./auth.js");
const voteRoutes = require("./vote.js");
const candidateRoutes = require("./candidate.js");

const rootRouter = express();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/vote", voteRoutes);
rootRouter.use("/candidate", candidateRoutes);

module.exports = rootRouter;
