const bcrypt = require("bcrypt");
const { db } = require("../utils/db");

function findVoterByIdNumber(idNumber) {
  return db.voter.findUnique({
    where: {
      idNumber,
    },
    include: {
      elections: true,
    },
  });
}

function createVoterByIdNumberAndPassword(voter) {
  voter.password = bcrypt.hashSync(voter.password, 10);
  return db.voter.create({
    data: voter,
  });
}

function findVoterById(id) {
  return db.voter.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  findVoterByIdNumber,
  findVoterById,
  createVoterByIdNumberAndPassword,
};
