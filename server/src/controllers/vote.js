// Controller
const notFoundException = require("../exception/notFound.js");
const voteService = require("../services/vote.js");

// const castVote = async (req, res) => {
//   try {
//     const voterId = req.voter.voterId;

//     const { candidateId } = req.body;
//     const result = await voteService.voteForCandidate(voterId, candidateId);
//     res.json(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const castVote = async (req, res) => {
  const { voterId } = req.voter;
  const { candidateId, electionId } = req.body;
  console.log("req.voter: ", req.voter);
  console.log("candidateId: ", candidateId);
  console.log("electionId: ", electionId);

  try {
    await voteService.encryptAndStoreVote(voterId, candidateId, electionId);
    res.status(200).send("Vote recorded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const tallyVotes = async (req, res) => {
  const { electionId } = req.params;
  console.log("electionId: ", electionId);
  try {
    const results = await voteService.retrieveAndTallyVotes(electionId);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { castVote, tallyVotes };
