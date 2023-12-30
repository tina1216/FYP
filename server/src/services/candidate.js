const { db } = require("../utils/db");

function findAllCandidate(idNumber) {
  return db.candidate.findMany();
}

module.exports = { findAllCandidate };
