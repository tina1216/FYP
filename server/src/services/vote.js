const { db } = require("../utils/db");
const sealUtils = require("../utils/encryption");

const encryptAndStoreVote = async (voterId, candidateId, electionId) => {
  // Check if the voter has already voted
  const voter = await db.voter.findUnique({
    where: {
      id: voterId,
    },
  });

  if (voter.hasVoted) {
    throw new Error("Voter has already voted.");
  }

  //  Verify election status
  const candidate = await db.candidate.findUnique({
    where: { id: candidateId },
  });

  if (!candidate) {
    throw new Error("Candidate not found.");
  }

  const election = await db.election.findUnique({
    where: { id: candidate.electionId },
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
  await db.voter.update({
    where: {
      id: voterId,
    },
    data: { hasVoted: true },
  });

  return "Vote cast successfully.";
};

const retrieveAndTallyVotes = async (electionId) => {
  const electionIdInt = parseInt(electionId);

  const encryptedVotes = await db.vote.findMany({
    where: { electionId: electionIdInt },
    select: { encryptedVote: true },
  });

  console.log(encryptedVotes);

  // decrypt each vote and tally the results
  const results = sealUtils.tallyVotes(encryptedVotes);

  return results;
};
// const voteForCandidate = async (voterId, candidateId) => {
//   // Step 1: Authentication is handled outside this function using JWT

//   // Step 2: Check if the voter has already voted
//   const voter = await db.voter.findUnique({
//     where: {
//       id: voterId,
//     },
//   });

//   if (voter.hasVoted) {
//     throw new Error("Voter has already voted.");
//   }

//   // Step 3: Verify election status
//   const candidate = await db.candidate.findUnique({
//     where: { id: candidateId },
//   });

//   if (!candidate) {
//     throw new Error("Candidate not found.");
//   }

//   const election = await db.election.findUnique({
//     where: { id: candidate.electionId },
//   });

//   if (election.electionStatus !== "ACTIVE") {
//     throw new Error("Election is not active.");
//   }

//   // Step 4: Create a Vote record
//   const encryptedVote = encryptVote(candidateId); // Implement your encryption logic
//   await db.vote.create({
//     data: {
//       voterId: voterId,
//       encryptedVote: encryptedVote,
//     },
//   });

//   // Step 5: Update the voter's status
//   await db.voter.update({
//     where: {
//       id: voterId,
//     },
//     data: { hasVoted: true },
//   });

//   return "Vote cast successfully.";
// };

module.exports = { encryptAndStoreVote, retrieveAndTallyVotes };
