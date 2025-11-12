import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// Creating Public and Admin routes
const isPublic = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdmin = createRouteMatcher(["/admin(.*)"]);
// Here we identified the public routes (The ones that doesn't need authentication)
export default clerkMiddleware((auth, req) => {
  // only userID: clerkID
  // const { userId } = auth();
  const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  // If this is an admin route and user is not admin then fly him back to home page
  if (isAdmin(req) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // If the user isn't an admin and is trying to access non-public route then protect.
  if (!isPublic(req)) {
    auth().protect();
  }
});
// We export the middleware function that will check if the route isn't public and then apply protection to it.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
