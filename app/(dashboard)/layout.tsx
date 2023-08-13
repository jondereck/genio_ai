import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();


  return (
    <div className="h-full relative">
      <div className="flex h-full">
        <Sidebar 
          isPro={isPro}
          apiLimitCount={apiLimitCount}/>
     
      <main className=" flex-1 md:pl-72 pb-10  w-full h-full">
        <Navbar />
        {children}
      </main> 
      </div>
    </div>
  );
}

export default DashboardLayout;