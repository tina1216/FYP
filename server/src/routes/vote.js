// route
const express = require("express");
const voteRoutes = express.Router();
const { showAllVotes } = require("../controllers/vote");
const errorHandler = require("../../errorHandler.js");

voteRoutes.get("/", errorHandler(showAllVotes));

module.exports = voteRoutes;
