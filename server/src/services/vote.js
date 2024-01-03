const { db } = require("../utils/db");
const sealUtils = require("../utils/encryption");

const encryptAndStoreVote = async (voterId, candidateId, electionId) => {
  // Check if the voter has already voted
  const voter = await db.voter.findUnique({
    where: {
      id: voterId,
    },
    include: {
      elections: {
        where: {
          electionId: electionId,
        },
      },
    },
  });

  if (voter.elections.length > 0) {
    throw new Error("Voter has already voted in this election.");
  }

  //  Verify election status
  const candidate = await db.candidate.findUnique({
    where: { id: candidateId },
  });

  if (!candidate) {
    throw new Error("Candidate not found.");
  }

  const election = await db.election.findUnique({
    where: { id: electionId },
  });

  if (election.electionStatus !== "ACTIVE") {
    throw new Error("Election is not active.");
  }

  // encode the vote and encrypt it using SEAL
  const encryptedVote = sealUtils.encryptVote(candidateId);

  // Save the encrypted vote in the Vote model
  await db.vote.create({
    data: {
      voterId: voterId,
      electionId: electionId,
      encryptedVote: encryptedVote,
      createdAt: new Date(),
    },
  });

  // Update the voter's status
  // Associate the election with the voter by creating a new ElectionVoter record
  await db.electionVoter.create({
    data: {
      voter: {
        connect: {
          id: voterId,
        },
      },
      election: {
        connect: {
          id: electionId,
        },
      },
      hasVoted: true,
    },
  });

  return "Vote cast successfully.";
};

const countVotesForCandidates = async (electionId) => {
  const electionIdInt = parseInt(electionId);

  // Get a list of candidates in the election
  const candidates = await db.candidate.findMany({
    where: { electionId: electionIdInt },
  });

  // Initialize a map to store candidate vote counts
  const candidateVoteCounts = {};

  // Retrieve all votes for the given election
  const votes = await db.vote.findMany({
    where: { electionId: electionIdInt },
    select: { voterId: true, encryptedVote: true },
  });

  // Decrypt and tally the votes for each candidate
  votes.forEach((vote) => {
    const candidateId = sealUtils.decryptVote(vote.encryptedVote); // Decrypt the vote
    if (candidateId in candidateVoteCounts) {
      candidateVoteCounts[candidateId]++;
    } else {
      candidateVoteCounts[candidateId] = 1;
    }
  });

  // Create a result object with candidate vote counts
  const results = candidates.map((candidate) => ({
    candidateId: candidate.id,
    candidateName: candidate.candidateName,
    voteCount: candidateVoteCounts[candidate.id] || 0,
  }));

  return results;
};

module.exports = { encryptAndStoreVote, countVotesForCandidates };
