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
    <div className=" ">
    <div className="flex h-full">
      <Sidebar 
        isPro={isPro}
        apiLimitCount={apiLimitCount}/>
      
      <main className="flex-auto">
        <div className="ml-auto"> {/* This div will push Navbar to the right */}
          <Navbar />
        </div>
        <div className="overflow-x-auto flex-1  h-screen">
          {children}
        </div>
      </main>
    </div>
  </div>
  
  );
}

export default DashboardLayout;