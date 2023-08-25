const { runBackup } = require("@vorlefan/prisma-backup");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const db = new PrismaClient();

async function main() {
    try {
        // Define the new bookmarks data
        // Read the existing data from bookmarks.json
        const rawData = fs.readFileSync("backups/14-33-2023-08-25/bookmarks.json");
        const existingData = JSON.parse(rawData);
        
        // Define the new data to be added
        const newData = [
          {
            id: "f9a6117a-fc8d-4582-bc8f-55dc289d5332",
            userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
            createdAt: "2023-08-24T02:58:41.860Z",
            updatedAt: "2023-08-24T03:03:39.144Z",
            src: "https://res.cloudinary.com/ddzjzrqrj/image/upload/v1691391160/rbwhx5i9amnoxpdon5xw.svg", // Always use this image URL
            name: "Slides AI",
            description: "AI-powered presentation software for creating and enhancing slides.",
            url: "https://www.slidesai.io/",
            tags: "Presentation, AI, Productivity",
            categoryId: "aa15625e-d60f-49c9-8a33-20259edb2f46" // Category ID for "Productivity"
          }
          
          ,
        ];
        
        // Append the new data to the existing data
        const updatedData = [...existingData, ...newData];
        
        // Write the updated data back to bookmarks.json
        fs.writeFileSync("bookmarks.json", JSON.stringify(updatedData, null, 2));

        // Inject the new bookmarks data
        await runBackup({
            models: {
                bookmarks: newData,
            },
            folder: "/backups",
        });

        console.log("New bookmarks added to the database.");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
