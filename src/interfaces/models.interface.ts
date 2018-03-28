import { ICommentModel } from "../models/comment.models";
import { IUserModel } from "../models/user.models";
import { IPostModel } from "../models/post.models";

export interface IModels {

    Comment: ICommentModel;
    Post: IPostModel;
    User: IUserModel;

}