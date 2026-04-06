import { formatDate } from "@/lib/format";
import Image from "next/image";
import type { ImageLoaderProps } from "next/image";
import LikeButton from "./like-icon";
import { TPost } from "@/types";

const imageLoader = ({ src, quality }: ImageLoaderProps): string => {
  const urlStart = src.split("upload/")[0];
  const urlEnd = src.split("upload/")[1];
  const transformation = `w_200,q_${quality}`;
  return `${urlStart}upload/${transformation}/${urlEnd}`;
};

export const Post = ({
  post,
  action,
}: {
  post: TPost;
  action: (postId: number) => Promise<void>;
}) => {
  return (
    <article className="post">
      <div className="relative w-32 h-24">
        <Image
          src={post.image}
          alt={post.title}
          width={200}
          height={120}
          loader={imageLoader}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
};
