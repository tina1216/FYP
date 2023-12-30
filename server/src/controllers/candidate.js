// Candidate Controller
const notFoundException = require("../exception/notFound.js");
const { findAllCandidate } = require("../services/candidate.js");

// show all candidates
const showAllCandidates = async (req, res) => {
  const allCandidates = await findAllCandidate();
  res.json(allCandidates);
};

// update result

// find by election id

// find by id

module.exports = { showAllCandidates };
