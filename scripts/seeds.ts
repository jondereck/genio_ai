const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const db = new PrismaClient();


// async function bookmarksCategory() {
//   try {
//     await db.bookmarksCategory.createMany({
//       data: [

//         { "name": "Graphic Design" },
//         // { "name": "Conversational AI" },
//         { "name": "Portable Apps" },
//         { "name": "AI Detection" },
//         { "name": "Generative Video" },
//         { "name": "Text to Voice" },
//         { "name": "Video Generation" },
//         { "name": "Productivity" },
//         { "name": "AI Tools" },
//         { "name": "Automation" }



//       ]
//     })
//   } catch (error) {
//     console.error("Error seeding default categories", error);
//   } finally {
//     await db.$disconnect();
//   }
// };

// bookmarksCategory();



// async function alterCategory() {
//   try {
//     await db.category.createMany({
//       data: [

//           { "name": "Celebrities" },
//           { "name": "Games" },
//           { "name": "Historical Figures" },
//           { "name": "Movies & TV" },
//           { "name": "Musicians" },
//           { "name": "Mythical Creature" },
//           { "name": "Philosophy" },
//           { "name": "Scientists" },
//           { "name": "Superheroes" },
//           { "name": "Fictional Characters" }

//       ]
//     })
//   } catch (error) {
//     console.error("Error seeding default categories", error);
//   } finally {
//     await db.$disconnect();
//   }
// };

// alterCategory();
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

