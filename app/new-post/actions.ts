"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type PrevState = {
  errors: string[];
};
export async function createPost(
  _prevState: Partial<PrevState>,
  formData: FormData,
): Promise<PrevState> {
  const title = String(formData.get("title")).trim();
  const image = formData.get("image") as File | null;
  const content = String(formData.get("content")).trim();

  const errors = [];

  if (title.length === 0) {
    errors.push("Title is required");
  }

  if (content.length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image!);
  } catch (error) {
    throw new Error(
      "Failed to upload image. Post not created. Please try again later.",
    );
  }

  storePost({
    title,
    imageUrl: imageUrl,
    content,
    userId: 1,
  });
  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
