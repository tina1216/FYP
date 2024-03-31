// route
const express = require("express");
const voteRoutes = express.Router();
const voteController = require("../controllers/vote.js");
const errorHandler = require("../../errorHandler.js");
const { isAuthenticated } = require("../middlewares/auth.js");

voteRoutes.post("/vote", isAuthenticated, voteController.castVote);

voteRoutes.get("/tally/:id_election", voteController.tallyVotesByCandidate);

voteRoutes.get("/tally", voteController.tallyAllVotes);

module.exports = voteRoutes;
