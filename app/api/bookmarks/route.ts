import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server"
import { json } from "stream/consumers"

export async function POST(
  req: Request
) { 
  try {
    const body = await req.json();
    const user = await currentUser();

    const {
      name,
      src,
      tags,
      description,
      url,
      categoryId
    } = body 

    if (!user || !user.id ) {
      return new NextResponse("Unauthorized", { status: 401})
    }

    if ( !name ||  !src || !description || !categoryId || !tags || !url) {
      return new NextResponse("Missing  required fields", { status: 400});
    }

    const bookmarks = await prismadb.bookmarks.create ({
        data: {
          categoryId,
          userId: user.id,
          name,
          src,
          description,
          url,
          tags

        }
    })

    return NextResponse.json(bookmarks);

    
  } catch (error) {
    console.log("[BOOKMARKS_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500})
  }

}