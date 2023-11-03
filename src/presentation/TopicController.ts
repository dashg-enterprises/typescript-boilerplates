import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { ITopicService } from "../application/TopicService";
import { inject } from "inversify";
import { Request } from "express";
import { TYPES } from "../TYPES";
import { BadRequestErrorMessageResult, JsonResult } from "inversify-express-utils/lib/results";
import { Post } from "../infrastructure/models/Post";

@controller("/topics")
export default class TopicController extends BaseHttpController {
    private _topicService: ITopicService;

    constructor(@inject(TYPES.ITopicService) topicService: ITopicService) {
        super();
        this._topicService = topicService;
    }

    @httpPost("/")
    private create(request: Request) {
        if (!request.body.accountId) {
            return new BadRequestErrorMessageResult("An account (id) is required to create a topic!");
        }
    
        return this._topicService.createTopic(request.body).catch((error: Error) => {
            if (error.message == "This account does not exist") {
                return new JsonResult(error, 404);
            }
        });
    }
    
    @httpGet("/")
    private getAll() {
        return this._topicService.getAllTopics();
    };
    
    @httpGet("/:id") 
    private getById(request: Request) {
        const topicId = +request.params.id;
        this._topicService.getTopicById(topicId);
    };

    // Topics subroutes
    @httpPost("/:id/posts")
    private addPost(request: Request) {
        const newPost = request.body as Post;
        return this._topicService.addPost(newPost);
    };
}

// router.put("/topics/:id", (request, response) => {
//     topicRepo.findOne({
//         where: {
//             id: request.body.id
//         }
//     }).then(requestedTopic => {
//         // 200 OK
//         // 400 Bad Request
//         // 401 Unauthorized
//         // 404 Not Found
//         // 409 Conflict

//         if (requestedTopic == null) {
//             response.status(404).send("That topic could not be found!");
//         }

//         if (requestedTopic.accountId != request.body.accountId) {
//             response.status(401).send("You are not authorized to edit that resource!!");
//         }
        
//         response.send(requestedTopic);
//     });


    
//     const updatedTopic = request.body;
//     topicRepo.save(updatedTopic).then(savedTopic => {
//         response.send(savedTopic);
//     });
// })

// router.delete("/topics/:id", (request, response) => {
//     const topicId = +request.params.id;
//     topicRepo.delete(topicId).then(deletedTopic => {
//         response.send(deletedTopic);
//     });
// });