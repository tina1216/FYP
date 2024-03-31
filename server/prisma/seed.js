const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
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
        id_election: "1",
        candidateName: "Alex Johnson",
        detail: "Liberty Party",
      },
      {
        id_election: "1",
        candidateName: "Jordan Hayes",
        detail: "Centrist Movement",
      },
      {
        id_election: "1",
        candidateName: "Grace Thompson",
        detail: "Visionary Party",
      },
      {
        id_election: "1",
        candidateName: "Charlotte Nguyen",
        detail: "Renewal Party",
      },
      {
        id_election: "2",
        candidateName: "Maria Rodriguez",
        detail: "Progressive Union",
      },
      {
        id_election: "2",
        candidateName: "Isabella Garcia",
        detail: "Freedom Party",
      },
      {
        id_election: "2",
        candidateName: "Liam Patel",
        detail: "Heritage Union",
      },
      {
        id_election: "2",
        candidateName: "William Martinez",
        detail: "Equality Movement",
      },
      {
        id_election: "3",
        candidateName: "Samuel Lee",
        detail: "Green Alliance",
      },
      {
        id_election: "3",
        candidateName: "Ethan Wang",
        detail: "People's Voice",
      },
      {
        id_election: "3",
        candidateName: "Emily Rivera",
        detail: "Citizens' Alliance",
      },
      {
        id_election: "3",
        candidateName: "Sophie Hernandez",
        detail: "Sustainable Future",
      },
      {
        id_election: "4",
        candidateName: "Emma Chen",
        detail: "National Coalition",
      },
      {
        id_election: "4",
        candidateName: "Ava Martin",
        detail: "New Horizon Party",
      },
      {
        id_election: "4",
        candidateName: "Mason Johnson",
        detail: "Progressive Network",
      },
      {
        id_election: "4",
        candidateName: "Henry Taylor",
        detail: "National Prosperity League",
      },
      {
        id_election: "5",
        candidateName: "David Smith",
        detail: "Democratic Front",
      },
      {
        id_election: "5",
        candidateName: "Noah Kim",
        detail: "Solidarity Group",
      },
      {
        id_election: "5",
        candidateName: "Zoe Wilson",
        detail: "Global Unity Party",
      },
      {
        id_election: "5",
        candidateName: "Isabelle Anderson",
        detail: "Democratic Reform Group",
      },
      {
        id_election: "6",
        candidateName: "Sophia Patel",
        detail: "Republican Circle",
      },
      {
        id_election: "6",
        candidateName: "Olivia Brown",
        detail: "Justice League",
      },
      {
        id_election: "6",
        candidateName: "Lucas Lee",
        detail: "Patriotic Front",
      },
      {
        id_election: "6",
        candidateName: "Oliver Williams",
        detail: "Liberal Society",
      },
    ],
  });

  // vote
  // const createManyVotes = await prisma.vote.createMany({
  //   data: [
  //     {
  //       userId: 1,
  //       id_election: 1,
  //       encryptedVote: "1",
  //     },
  //     {
  //       userId: 2,
  //       id_election: 2,
  //       encryptedVote: "2",
  //     },
  //     {
  //       userId: 3,
  //       id_election: 3,
  //       encryptedVote: "3",
  //     },
  //     {
  //       userId: 1,
  //       id_election: 3,
  //       encryptedVote: "1",
  //     },
  //     {
  //       userId: 2,
  //       id_election: 3,
  //       encryptedVote: "2",
  //     },
  //     {
  //       userId: 3,
  //       id_election: 3,
  //       encryptedVote: "3",
  //     },
  //   ],
  // });

  // results
  // const createManyResults = await prisma.result.createMany({
  //   data: [
  //     {
  //       candidateId: 1,
  //       id_election: 1,
  //       TotalEncryptedVote: "145", // count total votes -> decrypt
  //     },
  //     {
  //       candidateId: 2,
  //       id_election: 1,
  //       TotalEncryptedVote: "110",
  //     },
  //     {
  //       candidateId: 3,
  //       id_election: 1,
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
