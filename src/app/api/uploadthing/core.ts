import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@clerk/nextjs';

const f = createUploadthing();

const handleHAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');
  return { userId: userId };
};
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1} })
  .middleware(() => handleHAuth())
  .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf", "image/svg+xml"])
  .middleware(() => handleHAuth())
  .onUploadComplete(() => {})
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
