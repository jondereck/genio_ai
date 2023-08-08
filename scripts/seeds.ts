const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [

        

          { "name": "Celebrities" },
          { "name": "Games" },
          { "name": "Historical Figures" },
          { "name": "Movies & TV" },
          { "name": "Musicians" },
          { "name": "Mythical Creature" },
          { "name": "Philosophy" },
          { "name": "Scientists" },
          { "name": "Superheroes" }


   
      
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