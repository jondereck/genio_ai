import Heading from "@/components/Heading";
import AlterEgoPage from "@/components/alter-page";
import {Alters} from "@/components/alters";
import { Bookmark } from "@/components/bookmarks";
import { Categories } from "@/components/categories";
import NavbarBookmarks from "@/components/nabar-bookmarks";
import prismadb from "@/lib/prismadb"
import { VenetianMask } from "lucide-react";

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
        title="Ai Bookmark"
        description="Discover a new realm of personalized AI experiences."
        icon={VenetianMask}
        iconColor="text-amber-500"
        bgColor="bg-amber-500/5"
      />
      <NavbarBookmarks/>
      <Categories  data={categories}/>
      <Bookmark  data={data}/>
 
    </div>
  )
}

export default BookmarksPage;