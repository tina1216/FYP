const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

// Base64URL Section
function base64url(source) {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
}

const generateAccessToken = (voter) => {
  return jsonwebtoken.sign(
    {
      voterId: voter.id,
      idNumber: voter.idNumber,
    },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

const generateRefreshToken = (voter, jti) => {
  return jsonwebtoken.sign(
    {
      voterId: voter.id,
      idNumber: voter.idNumber,
      jti,
    },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
};

function generateTokens(voter, jti) {
  const accessToken = generateAccessToken(voter);
  const refreshToken = generateRefreshToken(voter, jti);

  console.log("generate accessToken", accessToken);
  console.log("generate RefreshToken", refreshToken);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
