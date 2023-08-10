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



async function newBookmarks() {
  try {
    const existingCategory = await db.bookmarksCategory.findFirst({
      where: {

        name: "Ai Detection",
      }
    });

    if (!existingCategory) {
      console.error("Category does not exist.")
      return;
    }

    
 

    // 1. Bookmark data Automation
    const bookmarkData1 = [
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "Zapier",
        description: "https://zapier.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "Automation, Integration, Workflow, AI, Productivity",
        categoryId: existingCategory.id
      },
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "DeepAI",
        description: "https://deepai.org/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Machine Learning, Automation, Image Processing, Text Analysis",
        categoryId: existingCategory.id
      }
    ];

    // 2. Bookmark data Grammar Tools
    const bookmarkData2 = [
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "QuillBot",
        description: "https://quillbot.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Text Analysis, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "Plagiarism Detector",
        description: "https://plagiarismdetector.net/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Plagiarism Detection, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "SpeedWrite",
        description: "https://speedwrite.com/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Writing, Productivity, Grammar Tools",
        categoryId: existingCategory.id
      },
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "Paralink Translation",
        description: "https://translation2.paralink.com/Filipino-English-Translation/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "AI, Translation, Language, Language Tools",
        categoryId: existingCategory.id
      }
    ];

     // 3. Bookmark data Ai Detection Tools
     const bookmarkData3 = [
      {
        src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
        name: "GPT Zero",
        description: "https://gptzero.me/",
        userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
        tags: "detection, writing, gpt0",
        categoryId: existingCategory.id
      }
    ];




    for (const data of bookmarkData3) {
      const existingBookmark = await db.bookmarks.findFirst({
        where: {
          description: data.description // Use a unique identifier here
        }
      });

      if (!existingBookmark) {
        await db.bookmarks.create({
          data: {
            ...data,
            id: uuidv4() // Generate a new UUID for each new bookmark
          }
        });
      } else {
        console.log(`Bookmark with description ${data.description} already exists.`);
      }

    }

    console.log("New bookmarks created.")


  } catch (error) {
    console.error("Error creating new Bookmarks", error)
  } finally {
    await db.$disconnect
  }
};

newBookmarks();