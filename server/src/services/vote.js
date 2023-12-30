const { db } = require("../utils/db");

// create vote
function createVote(electionId, voterId) {
  return db.vote.create({
    data: {
      electionId,
      voterId,
    },
  });
}

// get all votes
function findAllVotes() {
  return db.vote.findMany();
}

// get all votes by voter id
function findAllVotesByVoterId(voterId) {
  return db.vote.findMany({
    where: {
      voterId: voterId,
    },
  });
}

module.exports = { createVote, findAllVotes, findAllVotesByVoterId };
