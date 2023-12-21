import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

const login = (req, res) => {
  res.send("Login works");
};

const signup = async (req, res) => {
  const { idNumber, password } = req.body;

  try {
    let voter = await prisma.voter.findFirst({
      where: {
        idNumber,
      },
    });

    if (voter) {
      throw new Error("Account already exists");
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

export default { login, signup };
