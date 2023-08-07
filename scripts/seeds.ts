const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.bookmarksCategory.createMany({
      data: [
     
        { "name": "Productivity" },
        { "name": "Video Generation" },
        { "name": "Generative Art" },
        { "name": "Graphic Design" },
        { "name": "AI Detection" },
        { "name": "Portable Apps" },
        { "name": "Text-to-Voice" },
        { "name": "Generative Video" },
        { "name": "Coding" },
        { "name": "Automation" }

   
      
      ]
    })
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
};

main();