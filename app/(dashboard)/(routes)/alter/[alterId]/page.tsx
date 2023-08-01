import prismadb from "@/lib/prismadb";
import { AlterForm } from "../components/companion-form";

interface  AlterIdPageProps {
  params: {
    alterId: string;
  }
}

const AlterIdPage = async ({
  params
}: AlterIdPageProps) => {
  //TODO:

  const alter = await prismadb.alter.findUnique({
    where: {
      id: params.alterId
    }
  });

  const categories = await prismadb.category.findMany();
  return (
    <div>
      <AlterForm 
        initialData={alter}
        categories={categories}
      />
    </div>
    );
}
 
export default AlterIdPage;