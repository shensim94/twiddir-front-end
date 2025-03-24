import { IUser } from "./user.model";

export interface ITweet {
  id: number,
  content: string,
  user: IUser,
  likeCount: number,
  replyCount: number,
  parentTweetId: number,
  createdAt: Date,
}