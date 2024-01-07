// candidate route
const express = require("express");
const candidateRoutes = express.Router();
const errorHandler = require("../../errorHandler.js");
const { isAuthenticated } = require("../middlewares/auth.js");
const { getAllCandidates, getCandidateById } = require("../controllers/candidate.js");

candidateRoutes.get("/all", isAuthenticated, errorHandler(getAllCandidates));
candidateRoutes.get("/:id", isAuthenticated, errorHandler(getCandidateById));

module.exports = candidateRoutes;
