import Heading from "@/components/Heading";
import SubscriptionButton from "@/components/subscription-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";
import { SettingsIcon } from "lucide-react";
import  Link  from "next/link";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  

  return (
    <>
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={SettingsIcon}
        iconColor="text-gray-400"
        bgColor="bg-gray-400/10"

      />
      <div className="p-8 space-y-4 ">
        <div className="text-muted-foreground text-sm">
          {isPro ? (
            <p>
              You are currently on a
              <Badge className="mx-2" variant="gold">
                Gold
              </Badge>
              plan
            </p>
          ) : <p>
            You are currently on a
            <Badge className="mx-2" variant="outline">
              Free
            </Badge>
            plan
          </p>}
        </div>
        <div className="flex py-2 space-x-2">   
        <SubscriptionButton 
          isPro={isPro}
        /></div>

        <div className="flex flex-wrap justify-start items-center gap-2   ">
        <Button variant="secondary">
            <Link href="https://platform.openai.com/account/usage">
              Check OpenAi
            </Link>
        </Button>
        <Button variant="secondary">
            <Link href="https://replicate.com/account/billing#limits">
              Check Replicate
            </Link>
        </Button>  
        </div>
        
        </div>
   

    </>
  );
}

export default SettingsPage;