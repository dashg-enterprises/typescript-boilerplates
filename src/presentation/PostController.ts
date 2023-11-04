import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { ITopicService } from "../application/services/TopicService";
import { inject } from "inversify";
import { Request } from "express";
import { TYPES } from "../TYPES";
import { Post } from "../infrastructure/models/Post";
import TopicController from "./TopicController";

@controller("topics/:topicId/posts")
export default class PostController extends BaseHttpController {
    constructor(@inject(TYPES.ITopicService) private _topicService: ITopicService) {
        super();
    }

    @httpPost("/")
    private addPostToTopic(request: Request) {
        const newPost = request.body as Post;
        return this._topicService.addPost(newPost);
    };
}