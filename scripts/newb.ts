

async function newBookmarks() {
  try {
    const existingCategory = await db.bookmarksCategory.findFirst({
      where: {
   
        name: "Automation",
      }
    });

    if (!existingCategory) {
      console.error("Category does not exist.")
      return;
    }


    await db.bookmarks.createMany({

      data: [
        {
          id: uuidv4(),
          src: "https://cdn.icon-icons.com/icons2/3361/PNG/512/multimedia_communication_image_placeholder_photography_landscape_image_comics_picture_photo_gallery_image_icon_210828.png",
          name: "Remove bg",
          description: "https://www.remove.bg/",
          userId: "user_2Sx6hcUhFmTUVComqt7tIxpmmnm",
          tags: "image, background eraser, bg eraser",
          categoryId: existingCategory.id
        },
      ]
    });

    console.log("New bookmarks created.")
  } catch (error) {
    console.error("Error creating new Bookmarks", error)
  } finally {
    await db.$disconnect
  }
};

newBookmarks();