import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { badRequestsException } from "../exception/badRequests";
import ErrorCode from "../exception/root";

const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { idNumber, password } = req.body;

  try {
    let voter = await prisma.voter.findFirst({
      where: {
        idNumber,
      },
    });

    if (voter) {
      throw new badRequestsException("User not found.", ErrorCode.USER_ALREADY_EXISTS);
    }

    voter = await prisma.voter.create({
      data: {
        idNumber: idNumber,
        password: hashSync(password, 10),
      },
    });
    res.json(voter);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

const login = async (req, res) => {
  const { idNumber, password } = req.body;

  try {
    let voter = await prisma.voter.findFirst({
      where: {
        idNumber,
      },
    });

    if (!voter) {
      throw new Error("Account does not exist");
    }

    if (!compareSync(password, voter.password)) {
      throw new Error("Incorrect password");
    }

    const token = jsonwebtoken.sign(
      {
        id: voter.id,
      },
      process.env.JWT_ACCESS_SECRET
    );
    res.status(200).json({ voter, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

export default { login, signup };
