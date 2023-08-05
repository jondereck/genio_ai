import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { alterId: string }}
  
  ) {
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

    if (!params.alterId) {
      return new NextResponse("Alter Id is required!", { status: 400}) ;
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {status: 401 })
    }

    if (!src || !name || !description || !seed || !categoryId || !instructions) {
      return new NextResponse("Missing required fields",  { status: 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 })
    }

    const alter =  await prismadb.alter.update({
      where: {
        id: params.alterId,
        userId: user.id,
      },
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

    
  
    return NextResponse.json(alter);
    
  } catch (error) {
    console.log("ALTER_ERROR_UPDATE", error)
    return new NextResponse("Internal Error" , { status: 500});
    
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { alterId: string} } 
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const alter = await prismadb.alter.delete({
      where: {
        userId,
        id: params.alterId,
      }
    });

    return NextResponse.json(alter);
  } catch (error) {
    console.log("[ALTER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}