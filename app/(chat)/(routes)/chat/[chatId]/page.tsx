
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn();
  }

  const alter = await prismadb.alter.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  });

  if (!alter ) {
    return redirect("/alter");
  }

  return (
    <ChatClient 
    alter={alter}
    />

  )
}

export default ChatIdPage;