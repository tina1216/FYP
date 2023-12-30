// Controller
const notFoundException = require("../exception/notFound.js");
const db = require("../utils/db.js");
const { findAllVotes } = require("../services/vote.js");

const showAllVotes = async (req, res) => {
  const allVotes = await findAllVotes();
  res.json(allVotes);
};

module.exports = { showAllVotes };
