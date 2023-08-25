
const { PrismaClient } = require("@prisma/client");
const { runBackup } = require("@vorlefan/prisma-backup");

const db = new PrismaClient();
async function main() {
  try {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(timestamp.getDate()).padStart(2, '0');
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    
    const folderName = `${hours}-${minutes}-${year}-${month}-${day}`;

    const userApilimit = await db.userApiLimit.findMany();
    const userSubscription = await db.userSubscription.findMany();
    const category = await db.category.findMany();
    const alter = await db.alter.findMany();
    const bookmarks = await db.bookmarks.findMany();
    const bookmarksCategory = await db.bookmarksCategory.findMany();

    await runBackup({
      models: {
        userApiLimit: userApilimit,
        userSubscription: userSubscription,
        category: category,
        alter: alter,
        bookmarks: bookmarks,
        bookmarksCategory: bookmarksCategory,
      },
      folder: "/backups",
      backupFolderName: folderName
    });

    await db.$disconnect;

  } catch (error) {
    console.error("Error creating a backup", error)
  }
}

main();