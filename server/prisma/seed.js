const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // election

  const electionData = [
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
  ];

  const elections = await Promise.all(
    electionData.map(async (election) => {
      return prisma.election.create({ data: election });
    })
  );

  // Candidate
  const candidateData = [
    {
      electionId: elections[0].id,
      candidateName: "Alex Johnson",
      detail: "Liberty Party",
    },
    {
      electionId: elections[0].id,
      candidateName: "Jordan Hayes",
      detail: "Centrist Movement",
    },
    {
      electionId: elections[0].id,
      candidateName: "Grace Thompson",
      detail: "Visionary Party",
    },
    {
      electionId: elections[0].id,
      candidateName: "Charlotte Nguyen",
      detail: "Renewal Party",
    },
    {
      electionId: elections[1].id,
      candidateName: "Maria Rodriguez",
      detail: "Progressive Union",
    },
    {
      electionId: elections[1].id,
      candidateName: "Isabella Garcia",
      detail: "Freedom Party",
    },
    {
      electionId: elections[1].id,
      candidateName: "Liam Patel",
      detail: "Heritage Union",
    },
    {
      electionId: elections[1].id,
      candidateName: "William Martinez",
      detail: "Equality Movement",
    },
    {
      electionId: elections[2].id,
      candidateName: "Samuel Lee",
      detail: "Green Alliance",
    },
    {
      electionId: elections[2].id,
      candidateName: "Ethan Wang",
      detail: "People's Voice",
    },
    {
      electionId: elections[2].id,
      candidateName: "Emily Rivera",
      detail: "Citizens' Alliance",
    },
    {
      electionId: elections[2].id,
      candidateName: "Sophie Hernandez",
      detail: "Sustainable Future",
    },
    {
      electionId: elections[3].id,
      candidateName: "Emma Chen",
      detail: "National Coalition",
    },
    {
      electionId: elections[3].id,
      candidateName: "Ava Martin",
      detail: "New Horizon Party",
    },
    {
      electionId: elections[3].id,
      candidateName: "Mason Johnson",
      detail: "Progressive Network",
    },
    {
      electionId: elections[3].id,
      candidateName: "Henry Taylor",
      detail: "National Prosperity League",
    },
    {
      electionId: elections[4].id,
      candidateName: "David Smith",
      detail: "Democratic Front",
    },
    {
      electionId: elections[4].id,
      candidateName: "Noah Kim",
      detail: "Solidarity Group",
    },
    {
      electionId: elections[4].id,
      candidateName: "Zoe Wilson",
      detail: "Global Unity Party",
    },
    {
      electionId: elections[4].id,
      candidateName: "Isabelle Anderson",
      detail: "Democratic Reform Group",
    },
    {
      electionId: elections[5].id,
      candidateName: "Sophia Patel",
      detail: "Republican Circle",
    },
    {
      electionId: elections[5].id,
      candidateName: "Olivia Brown",
      detail: "Justice League",
    },
    {
      electionId: elections[5].id,
      candidateName: "Lucas Lee",
      detail: "Patriotic Front",
    },
    {
      electionId: elections[5].id,
      candidateName: "Oliver Williams",
      detail: "Liberal Society",
    },
  ];

  await prisma.candidate.createMany({
    data: candidateData,
  });

  // vote
  // const createManyVotes = await prisma.vote.createMany({
  //   data: [
  //     {
  //       userIdentifier: 1,
  //       electionId: 1,
  //       encryptedVote: "1",
  //     },
  //     {
  //       userIdentifier: 2,
  //       electionId: 2,
  //       encryptedVote: "2",
  //     },
  //     {
  //       userIdentifier: 3,
  //       electionId: 3,
  //       encryptedVote: "3",
  //     },
  //     {
  //       userIdentifier: 1,
  //       electionId: 3,
  //       encryptedVote: "1",
  //     },
  //     {
  //       userIdentifier: 2,
  //       electionId: 3,
  //       encryptedVote: "2",
  //     },
  //     {
  //       userIdentifier: 3,
  //       electionId: 3,
  //       encryptedVote: "3",
  //     },
  //   ],
  // });

  // results
  // const createManyResults = await prisma.result.createMany({
  //   data: [
  //     {
  //       candidateId: 1,
  //       electionId: 1,
  //       TotalEncryptedVote: "145", // count total votes -> decrypt
  //     },
  //     {
  //       candidateId: 2,
  //       electionId: 1,
  //       TotalEncryptedVote: "110",
  //     },
  //     {
  //       candidateId: 3,
  //       electionId: 1,
  //       TotalEncryptedVote: "220",
  //     },
  //   ],
  // });
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
