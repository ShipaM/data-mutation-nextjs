import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

if (!process.env.CLOUDINARY_NAME) {
  throw new Error("Missing Cloudinary name");
}
if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Missing Cloudinary API key");
}
if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Missing Cloudinary API secret");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image: File): Promise<string> {
  const imageData = await image.arrayBuffer();
  const mime = image.type;

  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = `data:${mime};base64,${base64Data}`;

  const result: UploadApiResponse = await cloudinary.uploader.upload(fileUri, {
    folder: "nextjs-course-mutations",
  });

  return result.secure_url;
}
