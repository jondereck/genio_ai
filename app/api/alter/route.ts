import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try { 
    const body = await req.json();
    const user = await currentUser();
    const {
      src,
      name,
      description,
      instructions,
      seed,
      categoryId,
    } = body

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {status: 401 })
    }

    if (!src || !name || !description || !seed || !categoryId || !instructions) {
      return new NextResponse("Missing required fields",  { status: 400});
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial expired", { status: 403 }) 
    }

    const alter =  await prismadb.alter.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed
      }
    });

    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(alter);
    
  } catch (error) {
    console.log("ALTER_ERROR_POST", error)
    return new NextResponse("Internal Error" , { status: 500});
    
  }
}