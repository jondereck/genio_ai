const { getBackup } = require("@vorlefan/prisma-backup");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await getBackup({
            onCurrentModel: async function ({ instance, currentModel, currentFile }) {
                if (currentFile.name === "bookmarks") {
                    const data = currentModel;

                    // Check if a bookmark with the same unique identifier (e.g., id) exists
                    const existingBookmark = await db.bookmarks.findUnique({
                        where: {
                            id: data.id, // Assuming id is the unique identifier
                        },
                    });

                    if (!existingBookmark) {
                        // Insert the bookmark into the database
                        const newBookmark = await db.bookmarks.create({
                            data: {
                                userId: data.userId,
                                src: data.src,
                                name: data.name,
                                url: data.url,
                                description: data.description,
                                categoryId: data.categoryId,
                                tags: data.tags,
                            },
                        });
                        console.log('Restored bookmarks', newBookmark);
                    } else {
                        console.log(`Bookmarks already exist. Skipping ${data.name}...`)
                    }


                } else if (currentFile.name === "alter") {
                    const data = currentModel;

                    // Check if a bookmark with the same unique identifier (e.g., id) exists
                    const existingAlter = await db.alter.findUnique({
                        where: {
                            id: data.id, // Assuming id is the unique identifier
                        },
                    });

                    if (!existingAlter) {
                        // Insert the bookmark into the database
                        const newAlter = await db.alter.create({
                            data: {
                                userId: data.userId,
                                src: data.src,
                                userName: data.userName,
                                name: data.name,
                                instructions: data.instructions,
                                description: data.description,
                                categoryId: data.categoryId,
                                seed: data.seed

                                
                            },
                        });
                        console.log('Restored alters', newAlter);
                    } else {
                        console.log(`Alter already exist. Skipping ${data.name}...`)
                    }


                } else if (currentFile.name === "category") {
                    const data = currentModel;

                    // Check if a bookmark with the same unique identifier (e.g., id) exists
                    const existingCategory = await db.category.findUnique({
                        where: {
                            id: data.id, // Assuming id is the unique identifier
                        },
                    });

                    if (!existingCategory) {
                        // Insert the bookmark into the database
                        const newCategory = await db.category.create({
                            data: { 
                                name: data.name,                            
                            },
                        });
                        console.log('Restored Alter Category', newCategory);
                    } else {
                        console.log(`Alter Category already exist. Skipping ${data.name}...`)
                    }


                } else if (currentFile.name === "bookmarksCategory") {
                    const data = currentModel;

                    // Check if a bookmark with the same unique identifier (e.g., id) exists
                    const existingBookmarksCategory = await db.bookmarksCategory.findUnique({
                        where: {
                            id: data.id, // Assuming id is the unique identifier
                        },
                    });

                    if (!existingBookmarksCategory) {
                        // Insert the bookmark into the database
                        const newBookmarksCategory = await db.bookmarksCategory.create({
                            data: { 
                                name: data.name,                            
                            },
                        });
                        console.log('Restored Bookmarks Category', newBookmarksCategory);
                    } else {
                        console.log(`Bookmarks Category already exist. Skipping ${data.name}...`)
                    }


                }
            },
            folder: "/backups",
            backupFolderName: "14-33-2023-08-25", // Specify the name of the folder you want to restore from
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await db.$disconnect();
    }
}

main();
