const CryptoJS = require("crypto-js");

function hashToken(token) {
  return CryptoJS.SHA256(token).toString(CryptoJS.enc.Hex);
}

module.exports = { hashToken };
