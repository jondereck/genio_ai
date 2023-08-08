const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.bookmarksCategory.createMany({
      data: [
     
        { "name": "Graphic Design" },
        { "name": "Conversational AI" },
        { "name": "Portable Apps" },
        { "name": "AI Detection" },
        { "name": "Generative Video" },
        { "name": "Text-to-Voice" },
        { "name": "Video Generation" },
        { "name": "Productivity" },
        { "name": "AI Tools" },
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

// delete

// async function main() {
//   try {

//     const categoriesToDelete = ["AI Tools"]
//     await db.bookmarksCategory.deleteMany({
//      where: {
//         name: {
//           in: categoriesToDelete
//         }
//      }
//     })
//   } catch (error) {
//     console.error("Error seeding default categories", error);
//   } finally {
//     await db.$disconnect();
//   }
// };

// main();