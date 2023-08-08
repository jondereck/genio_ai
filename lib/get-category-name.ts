
import { PrismaClient, BookmarksCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function getCategoryByName(name: string): Promise<BookmarksCategory | null> {
  const category = await prisma.bookmarksCategory.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });

  return category;
}

export default getCategoryByName;

