
import prismadb from "@/lib/prismadb";
import { BookmarkForm } from "../components/bookmark-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface  BookmarkIdPageProps {
  params: {
    bookmarksId: string;
  }
}

const BookmarkIdPage = async ({
  params
}: BookmarkIdPageProps) => {
  const { userId } = auth();
  //TODO:
  if (!userId) {
    return redirectToSignIn();
  }

  const bookmarks = await prismadb.bookmarks.findUnique({
    where: {
      id: params.bookmarksId,
      userId
    }
  });

  const categories = await prismadb.bookmarksCategory.findMany();
  
  return (
    <div>
      <BookmarkForm 
        initialData={bookmarks}
        categories={categories}
      />
    </div>
    );
}
 
export default BookmarkIdPage;