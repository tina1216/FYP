const SEAL = require("node-seal");

let seal, encryptor, batchEncoder, context, evaluator, decryptor;

const initializeEncryption = async () => {
  try {
    seal = await SEAL();

    const schemeType = seal.SchemeType.bfv;
    const securityLevel = seal.SecurityLevel.tc128;
    const polyModulusDegree = 4096;
    const bitSizes = [36, 36, 37];
    const bitSize = 20;

    const encParms = seal.EncryptionParameters(schemeType);
    encParms.setPolyModulusDegree(polyModulusDegree);
    encParms.setCoeffModulus(
      seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes))
    );
    encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

    context = seal.Context(encParms, true, securityLevel);
    if (!context.parametersSet()) {
      throw new Error("Could not set the parameters in the given context.");
    }

    const keyGenerator = seal.KeyGenerator(context);
    const secretKey = keyGenerator.secretKey();
    const publicKey = keyGenerator.createPublicKey();

    evaluator = seal.Evaluator(context);
    batchEncoder = seal.BatchEncoder(context);
    encryptor = seal.Encryptor(context, publicKey);
    decryptor = seal.Decryptor(context, secretKey);
  } catch (err) {
    console.log("Error at initializeEncryption: ", err);
  }
};

const encryptVote = (vote) => {
  // Example: encode the vote as a number
  const votePlainText = seal.PlainText();
  batchEncoder.encode(Int32Array.from([vote]), votePlainText);
  const encryptedVote = seal.CipherText();
  encryptor.encrypt(votePlainText, encryptedVote);

  // Serialize and return the encrypted vote
  return encryptedVote.save();
};

const tallyVotes = (encryptedVotes) => {
  let totalEncryptedVoteCounts = seal.CipherText();
  const zeroPlainText = seal.PlainText();

  batchEncoder.encode(Int32Array.from(new Array(1).fill(0)), zeroPlainText);
  encryptor.encrypt(zeroPlainText, totalEncryptedVoteCounts);

  encryptedVotes.forEach(({ encryptedVote }) => {
    const encryptedVoteObj = seal.CipherText();
    encryptedVoteObj.load(context, encryptedVote);
    totalEncryptedVoteCounts = seal
      .Evaluator(context)
      .add(totalEncryptedVoteCounts, encryptedVoteObj);
  });

  const plainTextResult = seal.PlainText();
  decryptor.decrypt(totalEncryptedVoteCounts, plainTextResult);
  const voteCounts = batchEncoder.decode(plainTextResult);

  return voteCounts;
};

const decryptVote = (encryptedVote) => {
  const encryptedVoteObj = seal.CipherText();
  encryptedVoteObj.load(context, encryptedVote);
  const decryptedVotePlainText = seal.PlainText();
  decryptor.decrypt(encryptedVoteObj, decryptedVotePlainText);
  const decryptedVoteArray = batchEncoder.decode(decryptedVotePlainText);
  console.log(decryptedVoteArray[0]);
  return decryptedVoteArray[0]; // Assuming the vote is represented as a single integer
};

module.exports = {
  initializeEncryption,
  encryptVote,
  tallyVotes,
  decryptVote,
};
