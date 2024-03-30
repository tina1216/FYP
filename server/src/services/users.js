const bcrypt = require("bcrypt");
const { db } = require("../utils/db");

function findUserByUserId(userId) {
  return db.user.findUnique({
    where: {
      userId,
    },
    include: {
      elections: true,
    },
  });
}

function createUserByUserIdAndPassword(user) {
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
  findUserByUserId,
  findUserById,
  createUserByUserIdAndPassword,
};
