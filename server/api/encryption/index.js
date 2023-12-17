(async () => {
  const SEAL = require("node-seal");

  // Wait for the web assembly to fully initialize
  const seal = await SEAL();

  ////////////////////////
  // Encryption Parameters
  ////////////////////////

  // Create a new EncryptionParameters
  const schemeType = seal.SchemeType.bfv;
  const securityLevel = seal.SecurityLevel.tc128;
  const polyModulusDegree = 4096;
  const bitSizes = [36, 36, 37];
  const bitSize = 20;

  const encParms = seal.EncryptionParameters(schemeType);

  // Assign Poly Modulus Degree
  encParms.setPolyModulusDegree(polyModulusDegree);

  // Create a suitable set of CoeffModulus primes
  encParms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));

  // Assign a PlainModulus (only for bfv/bgv scheme type)
  encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

  ////////////////////////
  // Context
  ////////////////////////

  // Create a new Context
  const context = seal.Context(encParms, true, securityLevel);

  // Helper to check if the Context was created successfully
  if (!context.parametersSet()) {
    throw new Error(
      "Could not set the parameters in the given context. Please try different encryption parameters."
    );
  }

  ////////////////////////
  // Keys
  ////////////////////////

  // Create a new KeyGenerator
  const keyGenerator = seal.KeyGenerator(context);

  // Get the SecretKey from the keyGenerator
  const secretKey = keyGenerator.secretKey();

  // Get the PublicKey from the keyGenerator
  const publicKey = keyGenerator.createPublicKey();

  ////////////////////////
  // Instances
  ////////////////////////

  // Create an Evaluator
  const evaluator = seal.Evaluator(context);

  // Create a BatchEncoder
  const batchEncoder = seal.BatchEncoder(context);

  // Create an Encryptor
  const encryptor = seal.Encryptor(context, publicKey);

  // Create a Decryptor
  const decryptor = seal.Decryptor(context, secretKey);

  ////////////////////////
  // Homomorphic Functions
  ////////////////////////

  // Simulate votes from 10 users
  const users = [123, 457, 890, 567, 321, 654, 789, 234, 876, 543];
  const candidates = ["1", "2", "3"];

  // Initialize vote counters for each candidate
  let voteCountCanA = 0;
  let voteCountCanB = 0;
  let voteCountCanC = 0;

  // Encrypt and accumulate votes for each candidate separately
  const combinedResultCan1 = seal.CipherText();
  const combinedResultCan2 = seal.CipherText();
  const combinedResultCan3 = seal.CipherText();

  // Initialize with encrypted zero
  const zeroPlainText = seal.PlainText();
  batchEncoder.encode(Int32Array.from([0]), zeroPlainText);
  encryptor.encrypt(zeroPlainText, combinedResultCan1);
  encryptor.encrypt(zeroPlainText, combinedResultCan2);
  encryptor.encrypt(zeroPlainText, combinedResultCan3);

  for (const userID of users) {
    const candidateID = candidates[Math.floor(Math.random() * candidates.length)];

    // Log user votes
    console.log(`User ${userID} voted for Candidate ${candidateID}`);

    // Increment the appropriate vote counter
    if (candidateID === "1") {
      voteCountCanA++;
    } else if (candidateID === "2") {
      voteCountCanB++;
    } else if (candidateID === "3") {
      voteCountCanC++;
    }
  }

  // Encrypt and add the vote counts
  const voteCountCanAPlaintext = seal.PlainText();
  const voteCountCanBPlaintext = seal.PlainText();
  const voteCountCanCPlaintext = seal.PlainText();

  batchEncoder.encode(Int32Array.from([voteCountCanA]), voteCountCanAPlaintext);
  batchEncoder.encode(Int32Array.from([voteCountCanB]), voteCountCanBPlaintext);
  batchEncoder.encode(Int32Array.from([voteCountCanC]), voteCountCanCPlaintext);

  encryptor.encrypt(voteCountCanAPlaintext, combinedResultCan1);
  encryptor.encrypt(voteCountCanBPlaintext, combinedResultCan2);
  encryptor.encrypt(voteCountCanCPlaintext, combinedResultCan3);

  // Decrypt and log the final result for each candidate
  const plainTextResultCan1 = seal.PlainText();
  const plainTextResultCan2 = seal.PlainText();
  const plainTextResultCan3 = seal.PlainText();

  decryptor.decrypt(combinedResultCan1, plainTextResultCan1);
  decryptor.decrypt(combinedResultCan2, plainTextResultCan2);
  decryptor.decrypt(combinedResultCan3, plainTextResultCan3);

  console.log("Final Tally for Candidate A:", batchEncoder.decode(plainTextResultCan1)[0]);
  console.log("Final Tally for Candidate B:", batchEncoder.decode(plainTextResultCan2)[0]);
  console.log("Final Tally for Candidate C:", batchEncoder.decode(plainTextResultCan3)[0]);
})();
