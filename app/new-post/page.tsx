import { PostForm } from "@/components/post-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Post",
  description: "Create a new post.",
};

export default function NewPostPage() {
  return <PostForm />;
}
