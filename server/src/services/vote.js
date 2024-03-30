const { db } = require("../utils/db");
const encryptionUtils = require("../utils/encryption");

const config = require("../config/config");

const encryptAndStoreVote = async (userId, candidateId, electionId) => {
  // Check if the user has already voted
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      elections: {
        where: {
          electionId: electionId,
        },
      },
    },
  });

  if (user.elections.length > 0) {
    throw new Error("User has already voted in this election.");
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

  // encode the vote and encrypt it
  const encryptedVote = encryptionUtils.encryptData(candidateId, config.ENCRYPTION_PASSWORD);

  // Save the encrypted vote in the Vote model
  await db.vote.create({
    data: {
      userId: userId,
      electionId: electionId,
      encryptedVote: encryptedVote,
      createdAt: new Date(),
    },
  });

  // Update the user's status
  await db.electionUser.create({
    data: {
      user: {
        connect: {
          id: userId,
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
    select: { userId: true, encryptedVote: true },
  });

  // Decrypt and tally the votes for each candidate
  votes.forEach((vote) => {
    const candidateId = encryptionUtils.decryptData(vote.encryptedVote, config.ENCRYPTION_PASSWORD); // Decrypt the vote
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

const countAllVotes = async () => {
  const elections = await db.election.findMany();
  const candidates = await db.candidate.findMany();

  let resultsByElection = {};

  for (const election of elections) {
    let candidateVoteCounts = {};

    const votes = await db.vote.findMany({
      where: { electionId: election.id },
      select: { userId: true, encryptedVote: true },
    });

    votes.forEach((vote) => {
      const candidateId = encryptionUtils.decryptData(
        vote.encryptedVote,
        config.ENCRYPTION_PASSWORD
      );
      if (candidateId in candidateVoteCounts) {
        candidateVoteCounts[candidateId]++;
      } else {
        candidateVoteCounts[candidateId] = 1;
      }
    });

    let electionResults = candidates
      .filter((candidate) => candidate.electionId === election.id)
      .map((candidate) => ({
        candidateId: candidate.id,
        candidateName: candidate.candidateName,
        detail: candidate.detail,
        voteCount: candidateVoteCounts[candidate.id] || 0,
      }));

    resultsByElection[election.id] = {
      electionName: election.electionName,
      results: electionResults,
    };
  }

  return resultsByElection;
};

module.exports = { encryptAndStoreVote, countVotesForCandidates, countAllVotes };
