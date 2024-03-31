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

const generateAccessToken = (user) => {
  return jsonwebtoken.sign(
    {
      id_user: user.id,
      userId: user.userId,
    },
    config.JWT_ACCESS_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

const generateRefreshToken = (user, jti) => {
  return jsonwebtoken.sign(
    {
      id_user: user.id,
      userId: user.userId,
      jti,
    },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
};

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

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
