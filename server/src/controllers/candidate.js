// Candidate Controller
const notFoundException = require("../exception/notFound.js");
const candidateService = require("../services/candidate.js");

// show all candidates
const getAllCandidates = async (req, res) => {
  const allCandidates = await candidateService.findAllCandidate();
  res.json(allCandidates);
};

const getCandidateById = async (req, res) => {
  try {
    const candidateId = req.params.id;
    console.log("candidateId: ", candidateId);
    const candidateById = await candidateService.findCandidateById(candidateId);
    res.json(candidateById);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllCandidates, getCandidateById };
