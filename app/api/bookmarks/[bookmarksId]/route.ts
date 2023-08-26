import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export async function PATCH(
  req: Request,
  { params }: { params: { bookmarksId: string }}
) { 
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      name,
      src,
      tags,
      url,
      description,
      categoryId
    } = body;

    if (!params.bookmarksId) {
      return new NextResponse("bookmarkId is required", { status: 400});
    }

    if (!user || !user.id ) {
      return new NextResponse("Unauthorized", { status: 401})
    }

    if ( !name ||  !src || !description || !categoryId) {
      return new NextResponse("Missing  required fields", { status: 400});
    }

    const bookmarks = await prismadb.bookmarks.update ({
      where: {
        id: params.bookmarksId,
        userId: user.id
      },
        data: {
          categoryId,
          userId: user.id,
          name,
          src,
          description,
          tags,
          url,
        }
    })

    return NextResponse.json(bookmarks);

    
  } catch (error) {
    console.log("[BOOKMARKS_UPDATE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500})
  }

}



export async function DELETE(
  req: Request,
  { params }: { params: { bookmarksId: string} } 
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const bookmarks = await prismadb.bookmarks.delete({
      where: {
        userId,
        id: params.bookmarksId,
      }
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.log("[BOOKMARK_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}