const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const config = require("./src/config/config.js");
const errorControllers = require("./src/controllers/error.js");
const rootRouter = require("./src/routes/index.js");
const { errorMiddleware } = require("./src/middlewares/errors.js");
const SignupSchema = require("./src/schema/users.js");

const prisma = new PrismaClient({
  log: ["query"],
});

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend app's origin
  credentials: true, // This is important for cookies, authorization headers with HTTPS
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(errorMiddleware);

app.use("/api", rootRouter);

//---------------
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
