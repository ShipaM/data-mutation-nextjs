import { formatDate } from "@/lib/format";
import Image from "next/image";
import LikeButton from "./like-icon";
import { TPost } from "@/types";

export const Post = ({
  post,
  action,
}: {
  post: TPost;
  action: (postId: number) => Promise<void>;
}) => {
  return (
    <article className="post">
      <div className="post-image">
        <Image src={post.image} alt={post.title} width={500} height={300} />
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
