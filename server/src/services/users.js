const bcrypt = require("bcrypt");
const { db } = require("../utils/db");

function findUserByUserIdentifier(userIdentifier) {
  return db.user.findUnique({
    where: {
      userIdentifier: userIdentifier,
    },
    include: {
      elections: true,
    },
  });
}

function createUserWithCredentials(user) {
  user.password = bcrypt.hashSync(user.password, 10);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

module.exports = {
  findUserByUserIdentifier,
  findUserById,
  createUserWithCredentials,
};
