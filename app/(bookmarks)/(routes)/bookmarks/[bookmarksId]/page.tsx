// import prismadb from "@/lib/prismadb";
// import { auth, redirectToSignIn } from "@clerk/nextjs";
// import { BookmarkClient } from "./components/client";


// interface BookmarkIdPageProps {
//   params: {
//     bookmarksId: string
//   } 
// }
// export const BookmarkIdPage = async ({
//   params
// }: BookmarkIdPageProps) => {
//   const { userId } = auth();

//   if (!userId) {
//    return redirectToSignIn();
//   }

//   const bookmarks = await prismadb.bookmarks.findUnique({
//     where:{
//       id: params.bookmarksId
//     }
//   })


//   return (
//     <BookmarkClient bookmarks={bookmarks}/>
//     );
// }
