const { db } = require("../utils/db");

// find all candidates
function findAllCandidate() {
  return db.candidate.findMany();
}

// find by election id
function findCandidateByElectionId(electionId) {
  return db.candidate.findUnique({
    where: {
      electionId,
    },
  });
}

// find by id
function findCandidateByCandidateId(candidateId) {
  return db.candidate.update({
    where: {
      id: candidateId,
    },
    data: {
      Result,
    },
  });
}

module.exports = { findAllCandidate };
