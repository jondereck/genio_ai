import prismadb from "@/lib/prismadb";
import { AlterForm } from "../components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface  AlterIdPageProps {
  params: {
    alterId: string;
  }
}

const AlterIdPage = async ({
  params
}: AlterIdPageProps) => {
  const { userId } = auth();
  //TODO:
  if (!userId) {
    return redirectToSignIn();
  }

  const alter = await prismadb.alter.findUnique({
    where: {
      id: params.alterId,
      userId
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