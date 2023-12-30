// candidate route
const express = require("express");
const candidateRoutes = express.Router();
const errorHandler = require("../../errorHandler.js");
const { showAllCandidates } = require("../controllers/candidate.js");

candidateRoutes.get("/", errorHandler(showAllCandidates));

module.exports = candidateRoutes;
