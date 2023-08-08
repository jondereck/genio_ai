import Heading from "@/components/Heading";
import AlterEgoPage from "@/components/alter-page";
import { FaToolbox } from "react-icons/fa";
import { Bookmark } from "@/app/(dashboard)/(routes)/bookmarks/components/bookmarks";
import BookmarkNavPage from "@/components/bookmarks-page";
import { Categories } from "@/components/categories";
import NavbarBookmarks from "@/components/navbar-bookmarks";
import prismadb from "@/lib/prismadb"
import { BookmarkIcon, VenetianMask } from "lucide-react";

interface BookmarksPageProps  {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

const BookmarksPage = async ({
  searchParams
}: BookmarksPageProps) => {

  const data = await prismadb.bookmarks.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
     
    }, 
    orderBy: {
      createdAt: "desc"
    }
  })
  



  const categories = await prismadb.bookmarksCategory.findMany();
  return (
    <div className=" p-4 ">
       <Heading
        title="Ai Toolbox"
        description="Your gateway to AI tools and experiences, all in one place."
        icon={FaToolbox}
        iconColor="text-black"
        bgColor="bg-gradient-to-r from-pink-500 to-purple-500"
      />
      <BookmarkNavPage/>
      <div className="w-full overflow-x-auto space-x-2 flex p-1">
         <Categories  data={categories}/>
      </div>
     
      <Bookmark  data={data}/>
 
    </div>
  )
}

export default BookmarksPage;