'use client'

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";


interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () =>{
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error); 
    } finally {
      setLoading(false);
    }
  }
  return (
      <Button disabled={loading} variant={isPro ? "default" : "gold"} onClick={onClick}>
        {loading ? (
          <Loading/>
        ) : (
          <>
          {isPro ? "Manage Subscription" : "Upgrade to Gold"}
        {!isPro && <Zap className="w-4 h-4 fill-white ml-2"/>}
          </>
        )}
        
      </Button>
    );
}

export default SubscriptionButton;