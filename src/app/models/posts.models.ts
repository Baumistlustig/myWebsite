export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  likedBy: string[];
  dislikedBy: string[];
  created: Date;
  updated: Date | null;
  comments: string[] | null;
}
