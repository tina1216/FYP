const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const errorControllers = require("./src/controllers/error.js");
const rootRouter = require("./src/routes/index.js");
const { errorMiddleware } = require("./src/middlewares/errors.js");
const SignupSchema = require("./src/schema/users.js");

const prisma = new PrismaClient({
  log: ["query"],
});

const port = process.env.PORT;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(errorMiddleware);

app.use("/api", rootRouter);

//------------------
// Voter
//------------------

// app.get("/voter", async (req, res) => {
//   const allVoters = await prisma.voter.findMany();
//   res.json(allVoters);
// });

// app.post("/", async (req, res) => {
//   const newVoter = await prisma.voter.create({
//     data: req.body,
//   });
//   res.json(newVoter);
// });

// // update hasVoted
// app.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   const newHasVoted = req.body.hasVoted;
//   const updatedVoter = await prisma.voter.update({
//     where: {
//       id: parseInt(id),
//     },
//     data: {
//       hasVoted: newHasVoted,
//     },
//   });
//   res.json(updatedVoter);
// });

//------------------
// Election
//------------------
// app.get("/election", async (req, res) => {
//   const allElections = await prisma.election.findMany();
//   res.json(allElections);
// });

// app.get("/election/active", async (req, res) => {
//   const activeElections = await prisma.election.findMany({
//     where: {
//       electionStatus: "ACTIVE",
//     },
//   });
//   res.json(activeElections);
// });

// app.post("/election", async (req, res) => {
//   const newElection = await prisma.election.create({
//     data: req.body,
//   });
//   res.json(newElection);
// });

// app.use(controllers.notFound);
// app.use(controllers.handleErrors);

//---------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
