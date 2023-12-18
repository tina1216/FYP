const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const controllers = require("./src/controllers/");

const prisma = new PrismaClient();
const port = process.env.PORT;
const app = express();

app.use(express.json());

//------------------
// Voter
//------------------

app.get("/voter", async (req, res) => {
  const allVoters = await prisma.voter.findMany();
  res.json(allVoters);
});

app.post("/", async (req, res) => {
  const newVoter = await prisma.voter.create({
    data: req.body,
  });
  res.json(newVoter);
});

// update hasVoted
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newHasVoted = req.body.hasVoted;
  const updatedVoter = await prisma.voter.update({
    where: {
      id: parseInt(id),
    },
    data: {
      hasVoted: newHasVoted,
    },
  });
  res.json(updatedVoter);
});

//------------------
// Election
//------------------
app.get("/election", async (req, res) => {
  const allElections = await prisma.election.findMany();
  res.json(allElections);
});

app.get("/election/active", async (req, res) => {
  const activeElections = await prisma.election.findMany({
    where: {
      electionStatus: "ACTIVE",
    },
  });
  res.json(activeElections);
});

app.post("/election", async (req, res) => {
  const newElection = await prisma.election.create({
    data: req.body,
  });
  res.json(newElection);
});

app.use(controllers.notFound);
app.use(controllers.handleErrors);

//---------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
