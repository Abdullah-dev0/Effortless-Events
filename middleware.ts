import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
   publicRoutes: [
      "/",
      "/events/:id",
      "/api/webhooks/clerk",
      "/api/webhooks/stripe",
      "/api/uploadthing",
   ],
   ignoredRoutes: [
      "/api/webhook/clerk",
      "/api/webhook/stripe",
      "/api/uploadthing",
   ],
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
