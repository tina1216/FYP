(async () => {
  const SEAL = require("node-seal");

  // Initialize SEAL
  const seal = await SEAL();

  // Encryption Parameters
  const schemeType = seal.SchemeType.bfv;
  const securityLevel = seal.SecurityLevel.tc128;
  const polyModulusDegree = 4096;
  const bitSizes = [36, 36, 37];
  const bitSize = 20;

  const encParms = seal.EncryptionParameters(schemeType);
  encParms.setPolyModulusDegree(polyModulusDegree);
  encParms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));
  encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

  // Context
  const context = seal.Context(encParms, true, securityLevel);
  if (!context.parametersSet()) {
    throw new Error("Could not set the parameters in the given context.");
  }

  // Keys
  const keyGenerator = seal.KeyGenerator(context);
  const secretKey = keyGenerator.secretKey();
  const publicKey = keyGenerator.createPublicKey();

  // Instances
  const evaluator = seal.Evaluator(context);
  const batchEncoder = seal.BatchEncoder(context);
  const encryptor = seal.Encryptor(context, publicKey);
  const decryptor = seal.Decryptor(context, secretKey);

  // Store Encrypted Votes
  const encryptedVotesStorage = [];

  function encryptAndStoreVote({ userID, candidateID, electionId }) {
    console.log(`User ${userID} voted for Candidate ${candidateID}`);

    // Encode the vote as a vector
    const voteVector = new Array(candidates.length).fill(0);
    voteVector[parseInt(candidateID) - 1] = 1; // CandidateID assumed to start from '1'
    const votePlainText = seal.PlainText();
    batchEncoder.encode(Int32Array.from(voteVector), votePlainText);
    const encryptedVote = seal.CipherText();
    encryptor.encrypt(votePlainText, encryptedVote);

    // Serialize and store the encrypted vote
    const serializedEncryptedVote = encryptedVote.save();
    const voteRecord = { userID, vote: serializedEncryptedVote, electionId };
    encryptedVotesStorage.push(voteRecord);
  }

  function retrieveAndTallyVotes(encryptedVoteRecords) {
    // Initialize an encrypted total vote count
    let totalEncryptedVoteCounts = seal.CipherText();
    const zeroPlainText = seal.PlainText();
    batchEncoder.encode(Int32Array.from(new Array(candidates.length).fill(0)), zeroPlainText);
    encryptor.encrypt(zeroPlainText, totalEncryptedVoteCounts);

    // Aggregate all votes in the provided records
    encryptedVoteRecords.forEach(({ vote: serializedEncryptedVote }) => {
      const encryptedVote = seal.CipherText();
      encryptedVote.load(context, serializedEncryptedVote);
      totalEncryptedVoteCounts = evaluator.add(totalEncryptedVoteCounts, encryptedVote);
    });

    // Decrypt and log the final result for each candidate
    const plainTextResult = seal.PlainText();
    decryptor.decrypt(totalEncryptedVoteCounts, plainTextResult);
    const voteCounts = batchEncoder.decode(plainTextResult);
    candidates.forEach((candidate, index) => {
      console.log(`Final Tally for Candidate ${candidate}:`, voteCounts[index]);
    });
  }

  const candidates = ["1", "2", "3"];
  const users = [
    { userID: "123", candidateID: "1" },
    { userID: "456", candidateID: "2" },
    { userID: "789", candidateID: "3" },
    { userID: "101", candidateID: "1" },
    { userID: "112", candidateID: "2" },
    { userID: "131", candidateID: "3" },
    { userID: "415", candidateID: "1" },
    { userID: "161", candidateID: "2" },
    { userID: "718", candidateID: "3" },
    { userID: "191", candidateID: "1" },
    { userID: "120", candidateID: "2" },
    { userID: "131", candidateID: "3" },
    { userID: "141", candidateID: "1" },
    { userID: "151", candidateID: "2" },
    { userID: "161", candidateID: "3" },
    { userID: "171", candidateID: "1" },
    { userID: "181", candidateID: "2" },
    { userID: "191", candidateID: "3" },
    { userID: "201", candidateID: "1" },
    { userID: "211", candidateID: "2" },
    { userID: "221", candidateID: "3" },
    { userID: "231", candidateID: "1" },
    { userID: "241", candidateID: "2" },
    { userID: "251", candidateID: "3" },
    { userID: "261", candidateID: "1" },
    { userID: "271", candidateID: "2" },
    { userID: "281", candidateID: "3" },
    { userID: "291", candidateID: "1" },
    { userID: "301", candidateID: "2" },
    { userID: "311", candidateID: "3" },
    { userID: "321", candidateID: "1" },
    { userID: "331", candidateID: "2" },
    { userID: "341", candidateID: "3" },
    { userID: "351", candidateID: "1" },
    { userID: "361", candidateID: "2" },
    { userID: "371", candidateID: "3" },
    { userID: "381", candidateID: "1" },
    { userID: "391", candidateID: "2" },
  ];

  // Example usage
  users.forEach(({ userID }) => {
    const candidateID = candidates[Math.floor(Math.random() * candidates.length)];
    encryptAndStoreVote({ userID, candidateID });
  });

  // Length of users
  console.log("Number of Users:", users.length);

  // When ready to tally
  retrieveAndTallyVotes(encryptedVotesStorage);
})();
