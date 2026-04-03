export type TPost = {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  userId?: string;
  likes: number;
  isLiked: boolean;
};
