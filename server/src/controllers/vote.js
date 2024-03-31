// Controller
const notFoundException = require("../exception/notFound.js");
const voteService = require("../services/vote.js");

const castVote = async (req, res) => {
  const { userId } = req.user;
  const { candidateId, id_election } = req.body;

  try {
    await voteService.encryptAndStoreVote(userId, candidateId, id_election);
    res.status(200).send("Vote recorded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const tallyVotesByCandidate = async (req, res) => {
  const { id_election } = req.params;
  try {
    const results = await voteService.countVotesForCandidates(id_election);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const tallyAllVotes = async (req, res) => {
  try {
    const results = await voteService.countAllVotes();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { castVote, tallyVotesByCandidate, tallyAllVotes };
