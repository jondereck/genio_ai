import Heading from "@/components/Heading";
import AlterEgoPage from "@/components/alter-page";
import {Alters} from "@/app/(dashboard)/(routes)/alter/components/alters";
import { Categories } from "@/components/categories";
import prismadb from "@/lib/prismadb"
import { VenetianMask } from "lucide-react";

interface AlterPageProps  {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

const AlterPage = async ({
  searchParams
}: AlterPageProps) => {
  const data = await prismadb.alter.findMany({
    where: {
      categoryId: searchParams.categoryId,
   name: searchParams.name
     
    }, 
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  const categories = await prismadb.category.findMany();

  return (
    <div className=" p-4 ">
       <Heading
        title="Ai Alter Companion"
        description="Discover a new realm of personalized AI experiences."
        icon={VenetianMask}
        iconColor="text-amber-500"
        bgColor="bg-amber-500/5"
      />
      <AlterEgoPage/>
      <Categories data={categories}/>
      <Alters  data={data}/> 
     
    </div>
  )
}

export default AlterPage;