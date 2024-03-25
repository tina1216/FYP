const crypto = require("node:crypto");
require("dotenv").config({ path: "../../.env" });

// Get encryption/decryption algorithm
function getAlgorithm() {
  return "aes-256-gcm";
}

// Get encrypted string prefix
function getEncryptedPrefix() {
  return "enc::";
}

// Derive 256 bit encryption key from password, using salt and iterations -> 32 bytes
function deriveKeyFromPassword(password, salt, iterations) {
  return crypto.pbkdf2Sync(password, salt, iterations, 32, "sha512");
}

// Encrypt AES 256 GCM
function encryptData(plainText, password) {
  try {
    if (typeof plainText === "object") {
      plainText = JSON.stringify(plainText);
    } else {
      plainText = String(plainText);
    }

    const algorithm = getAlgorithm();

    // Generate random salt -> 64 bytes
    const salt = crypto.randomBytes(64);

    // Generate random initialization vector -> 16 bytes
    const iv = crypto.randomBytes(16);

    // Generate random count of iterations between 10.000 - 99.999 -> 5 bytes
    const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    // Derive encryption key
    const encryptionKey = deriveKeyFromPassword(
      password,
      salt,
      Math.floor(iterations * 0.47 + 1337)
    );

    // Create cipher
    const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);

    // Update the cipher with data to be encrypted and close cipher
    const encryptedData = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

    // Get authTag from cipher for decryption // 16 bytes
    const authTag = cipher.getAuthTag();

    // Join all data into single string, include requirements for decryption
    const output = Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(iterations.toString()),
      encryptedData,
    ]).toString("hex");

    return getEncryptedPrefix() + output;
  } catch (error) {
    console.error("Encryption failed!");
    console.error(error);
    return undefined;
  }
}

// Decrypt AES 256 GCM
function decryptData(cipherText, password) {
  try {
    const algorithm = getAlgorithm();

    const cipherTextParts = cipherText.split(getEncryptedPrefix());

    // If it's not encrypted by this, reject with undefined
    if (cipherTextParts.length !== 2) {
      console.error(
        "Could not determine the beginning of the cipherText. Maybe not encrypted by this method."
      );
      return undefined;
    } else {
      cipherText = cipherTextParts[1];
    }

    const inputData = Buffer.from(cipherText, "hex");

    // Split cipherText into partials
    const salt = inputData.slice(0, 64);
    const iv = inputData.slice(64, 80);
    const authTag = inputData.slice(80, 96);
    const iterations = parseInt(inputData.slice(96, 101).toString("utf-8"), 10);
    const encryptedData = inputData.slice(101);

    // Derive key
    const decryptionKey = deriveKeyFromPassword(
      password,
      salt,
      Math.floor(iterations * 0.47 + 1337)
    );

    // Create decipher
    const decipher = crypto.createDecipheriv(algorithm, decryptionKey, iv);
    decipher.setAuthTag(authTag);

    // Decrypt data
    const decrypted = decipher.update(encryptedData, "binary", "utf-8") + decipher.final("utf-8");

    try {
      return JSON.parse(decrypted);
    } catch (error) {
      return decrypted;
    }
  } catch (error) {
    console.error("Decryption failed!");
    console.error(error);
    return undefined;
  }
}

module.exports = { encryptData, decryptData };
