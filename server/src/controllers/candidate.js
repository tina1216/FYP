// Candidate Controller
const notFoundException = require("../exception/notFound.js");
const { findAllCandidate } = require("../services/candidate.js");

// show all candidates
const showAllCandidates = async (req, res) => {
  const allCandidates = await findAllCandidate();
  res.json(allCandidates);
};

module.exports = { showAllCandidates };
