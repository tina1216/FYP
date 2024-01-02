const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const errorControllers = require("./src/controllers/error.js");
const rootRouter = require("./src/routes/index.js");
const { errorMiddleware } = require("./src/middlewares/errors.js");
const SignupSchema = require("./src/schema/users.js");
const { initializeEncryption } = require("./src/utils/encryption.js");

const prisma = new PrismaClient({
  log: ["query"],
});

// Initialize Encryption
initializeEncryption()
  .then(() => console.log("Encryption Initialized"))
  .catch((err) => console.error("Encryption Initialization Failed:", err));

const port = process.env.PORT;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(errorMiddleware);

app.use("/api", rootRouter);

//---------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
