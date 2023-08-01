const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Celebrities" },
        { name: "Historical Figures" },
        { name: "Fictional Characters" },
        { name: "Animals" },
        { name: "Superheroes" },
        { name: "Scientists and Innovators" },
        { name: "Musicians" },
        { name: "Historical Royalty" },
        { name: "Literary Characters" },
        { name: "Mythical Creatures" },
      ]
    })
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
};

main();