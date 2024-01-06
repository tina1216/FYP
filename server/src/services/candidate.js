const { db } = require("../utils/db");

// find all candidates
function findAllCandidate() {
  return db.candidate.findMany({
    where: {
      Election: {
        electionStatus: "ACTIVE",
      },
    },
    include: {
      Election: true, // This includes the related Election data in the result
    },
  });
}

module.exports = { findAllCandidate };
