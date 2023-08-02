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
    <div className="">
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={SettingsIcon}
        iconColor="text-gray-400"
        bgColor="bg-gray-400/10"

      />
      <div className="p-4 lg:px-8 space-y-4 ">
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
        <div className="flex space-x-2">
          
        <SubscriptionButton 
          isPro={isPro}
        />
        <Button variant="secondary">
            <Link href="https://platform.openai.com/account/usage">
              Check usage
            </Link>
        </Button>
        </div>
      </div>

    </div>
  );
}

export default SettingsPage;