import prismadb from "@/lib/prismadb";

const { PrismaClient } = require("@prisma/client");
const  { runBackup} =  require("@vorlefan/prisma-backup");

const db = new PrismaClient();
async function main(){
  try {

    const userApilimit = await prismadb.userApiLimit.findMany();
    const userSubscription = await db.userSubscription.findMany();
    const category = await db.category.findMany();
    const alter = await db.alter.findMany();
    const bookmarks = await db.bookmarks.findMany();
    const bookmarksCategory = await db.bookmarksCategory.findMany();

    await runBackup({
      models: {
        userApiLimit : userApilimit ,
        userSubscription  : userSubscription ,
        category: category,
        alter: alter,
        bookmarks: bookmarks,
        bookmarksCategory: bookmarksCategory,
      },
      folder: "/backups"
    });

    await db.$disconnect;
    
  } catch (error) {
    console.error("Error creating a backup", error)
  }
}

main();