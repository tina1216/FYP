const { db } = require("../utils/db");
const { hashToken } = require("../utils/hashToken");

// used when we create a refresh token.
function addRefreshTokenToWhitelist({ jti, refreshToken, voterId }) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      voterId,
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

function revokeTokens(voterId) {
  return db.refreshToken.updateMany({
    where: {
      voterId,
    },
    data: {
      revoked: true,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
