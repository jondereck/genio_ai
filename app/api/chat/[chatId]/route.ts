import { StreamingTextResponse, LangChainStream } from "ai";
import { auth, currentUser } from "@clerk/nextjs";
import { CallbackManager } from "langchain/callbacks";
import { Replicate } from "langchain/llms/replicate";
import { NextResponse } from "next/server";

import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate.limit";
import prismadb from "@/lib/prismadb";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(
  req: Request,
  { params }: { params: { chatId: string }}
) {
  try {
    const { prompt  } = await req.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const identifier = req.url + "_" + user.id;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429});
    }
    const alter = await prismadb.alter.update({
      where: {
        id: params.chatId,
        // userId: user.id
      }, 
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id
          }
        }
      }
    });

    if (!alter) {
      return new NextResponse("Alter not found", { status: 404 });
    }

    const name = alter.id;
    const alter_file_name = name + ".txt";
    

    const alterKey = {
      alterName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();

    const records = await memoryManager.readLatestHistory(alterKey);

    if (records.length === 0) {
      await memoryManager.seedChatHistory(alter.seed, "\n\n", alterKey)
    }

    await memoryManager.writeToHistory("User: " + prompt + "\n", alterKey);

    const recentChatHistory= await memoryManager.readLatestHistory(alterKey);

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      alter_file_name,
    );

    let relevantHistory = "";

    if (!!similarDocs && similarDocs.length !==  0 ) {
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");
    }


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 })
    }

    const { handlers } = LangChainStream();

    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    });

    model.verbose = true;
    const resp = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${alter.name}: prefix. 

        ${alter.instructions}

        Below are relevant details about ${alter.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${alter.name}:`
        )
        .catch(console.error)
    );
    
    const cleaned = resp.replaceAll(",", "");
    const chunks = cleaned.split("\n");
    const response = chunks[0];

    await memoryManager.writeToHistory("" + response.trim(), alterKey);
    var Readable = require("stream").Readable;

    let s = new Readable();
    s.push(response);
    s.push(null);
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory("" + response.trim(), alterKey);

      await prismadb.alter.update({
        where: {
          id: params.chatId
        },
        data: {
          messages: {
            create: {
              content: response.trim(),
              role: "system",
              userId: user.id,
            },
          },
        }
      });
    }

    if (!isPro) {
      await increaseApiLimit();
    }


    return new StreamingTextResponse(s);


  } catch (error) {
    console.log("[CHAT_POST]", error);
    return new NextResponse("Internal Error", { status: 500}); 
  }
}
