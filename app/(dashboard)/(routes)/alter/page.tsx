import Heading from "@/components/Heading";
import AlterEgoPage from "@/components/alter-page";
import { Categories } from "@/components/categories";
import prismadb from "@/lib/prismadb"
import { VenetianMask } from "lucide-react";

const AlterPage = async () => {
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4">
       <Heading
        title="Ai Alter Ego"
        description="Discover a new realm of personalized AI experiences."
        icon={VenetianMask}
        iconColor="text-amber-500"
        bgColor="bg-amer-500/5"
      />
      <AlterEgoPage/>
      <Categories data={categories}/>
     
    </div>
  )
}

export default AlterPage;