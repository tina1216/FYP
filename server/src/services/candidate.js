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

// find a candidate by candidate id
const findCandidateById = async (candidateId) => {
  try {
    if (candidateId === undefined || isNaN(candidateId)) {
      throw new Error("Invalid candidate ID");
    }

    const candidateIdInt = parseInt(candidateId); // Convert candidateId to an integer

    const candidate = await db.candidate.findUnique({
      where: {
        id: candidateIdInt, // Use the converted integer value
      },
      include: {
        Election: true,
      },
    });

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    if (candidate.Election && candidate.Election.electionStatus === "ACTIVE") {
      return candidate;
    } else {
      throw new Error("Related election is not active or not found.");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { findAllCandidate, findCandidateById };
