// Controller
const notFoundException = require("../exception/notFound.js");
const voteService = require("../services/vote.js");

const castVote = async (req, res) => {
  const { userIdentifier } = req.user;
  const { candidateId, electionId } = req.body;

  try {
    await voteService.encryptAndStoreVote(userIdentifier, candidateId, electionId);
    res.status(200).send("Vote recorded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const tallyVotesByCandidate = async (req, res) => {
  const { electionId } = req.params;
  try {
    const results = await voteService.countVotesForCandidates(electionId);
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
