const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  //voter admin
  const userAdmin = await prisma.voter.upsert({
    where: {
      idNumber: "admin123",
    },
    update: {},
    create: {
      idNumber: "admin123",
      password: "admin",
      role: "ADMIN",
    },
  });

  // voter voter1
  const createManyVoters = await prisma.voter.createMany({
    data: [
      {
        idNumber: "abc1234",
        password: "abc_1234",
        role: "USER",
      },
      {
        idNumber: "AS1111",
        password: "AA1111",
      },
      {
        idNumber: "BC2345788",
        password: "Xy_2345",
      },
      {
        idNumber: "CD3456899",
        password: "Yz_3456",
      },
    ],
  });

  // election
  const createManyElections = await prisma.election.createMany({
    data: [
      {
        electionName: "House of Representatives 2020 individual candidate",
        electionStatus: "CLOSED",
      },
      {
        electionName: "House of Representatives 2020 political party",
        electionStatus: "CLOSED",
      },
      {
        electionName: "House of Representatives 2023 individual candidate",
        electionStatus: "ACTIVE",
      },
      {
        electionName: "House of Representatives 2023 political party",
        electionStatus: "ACTIVE",
      },
      {
        electionName: "House of Representatives 2024 individual candidate",
        electionStatus: "UPCOMING",
      },
      {
        electionName: "House of Representatives 2024 political party",
        electionStatus: "UPCOMING",
      },
    ],
  });

  // Candidate
  const createManyCandidates = await prisma.candidate.createMany({
    data: [
      {
        electionId: 1,
        candidateName: "Alex Johnson",
        detail: "Liberty Party",
      },
      {
        electionId: 1,
        candidateName: "Jordan Hayes",
        detail: "Centrist Movement",
      },
      {
        electionId: 1,
        candidateName: "Grace Thompson",
        detail: "Visionary Party",
      },
      {
        electionId: 1,
        candidateName: "Charlotte Nguyen",
        detail: "Renewal Party",
      },
      {
        electionId: 2,
        candidateName: "Maria Rodriguez",
        detail: "Progressive Union",
      },
      {
        electionId: 2,
        candidateName: "Isabella Garcia",
        detail: "Freedom Party",
      },
      {
        electionId: 2,
        candidateName: "Liam Patel",
        detail: "Heritage Union",
      },
      {
        electionId: 2,
        candidateName: "William Martinez",
        detail: "Equality Movement",
      },
      {
        electionId: 3,
        candidateName: "Samuel Lee",
        detail: "Green Alliance",
      },
      {
        electionId: 3,
        candidateName: "Ethan Wang",
        detail: "People's Voice",
      },
      {
        electionId: 3,
        candidateName: "Emily Rivera",
        detail: "Citizens' Alliance",
      },
      {
        electionId: 3,
        candidateName: "Sophie Hernandez",
        detail: "Sustainable Future",
      },
      {
        electionId: 4,
        candidateName: "Emma Chen",
        detail: "National Coalition",
      },
      {
        electionId: 4,
        candidateName: "Ava Martin",
        detail: "New Horizon Party",
      },
      {
        electionId: 4,
        candidateName: "Mason Johnson",
        detail: "Progressive Network",
      },
      {
        electionId: 4,
        candidateName: "Henry Taylor",
        detail: "National Prosperity League",
      },
      {
        electionId: 5,
        candidateName: "David Smith",
        detail: "Democratic Front",
      },
      {
        electionId: 5,
        candidateName: "Noah Kim",
        detail: "Solidarity Group",
      },
      {
        electionId: 5,
        candidateName: "Zoe Wilson",
        detail: "Global Unity Party",
      },
      {
        electionId: 5,
        candidateName: "Isabelle Anderson",
        detail: "Democratic Reform Group",
      },
      {
        electionId: 6,
        candidateName: "Sophia Patel",
        detail: "Republican Circle",
      },
      {
        electionId: 6,
        candidateName: "Olivia Brown",
        detail: "Justice League",
      },
      {
        electionId: 6,
        candidateName: "Lucas Lee",
        detail: "Patriotic Front",
      },
      {
        electionId: 6,
        candidateName: "Oliver Williams",
        detail: "Liberal Society",
      },
    ],
  });

  // vote
  const createManyVotes = await prisma.vote.createMany({
    data: [
      {
        voterId: 1,
        encryptedVote: "candidate A", //candidate name -> Id
      },
      {
        voterId: 2,
        encryptedVote: "candidate B", //candidate name -> Id
      },
      {
        voterId: 3,
        encryptedVote: "candidate C", //candidate name -> Id
      },
    ],
  });

  // results
  const createManyResults = await prisma.result.createMany({
    data: [
      {
        candidateId: 1,
        TotalEncryptedVote: "145", // count total votes -> decrypt
      },
      {
        candidateId: 2,
        TotalEncryptedVote: "110",
      },
      {
        candidateId: 3,
        TotalEncryptedVote: "220",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
