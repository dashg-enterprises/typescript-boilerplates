import { Repository } from "typeorm";
import { Topic } from "../../infrastructure/models/Topic";
import { Account } from "../../infrastructure/models/Account";
import { Post } from "../../infrastructure/models/Post";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";

export interface ITopicService {
    createTopic(topic: Topic): Promise<Topic>;
    addPost(post: Post): Promise<Topic>;
    getAllTopics(): Promise<Topic[]>;
    getTopicById(id: number): Promise<Topic>;
}

@injectable()
export class TopicService implements ITopicService {
    topicRepo: Repository<Topic>;
    accountRepo: Repository<Account>;
    constructor(
        @inject(TYPES.TopicDataRepo) topicRepo: Repository<Topic>,
        @inject(TYPES.AccountDataRepo) accountRepo: Repository<Account>
    ) {
        this.topicRepo = topicRepo;
        this.accountRepo = accountRepo;
    }

    createTopic(topic: Topic) {
        return this.accountRepo.findOneBy({id: topic.accountId}).then(account => {
            if (account == null) {
                throw new Error("This account does not exist");
            }
            return this.topicRepo.save(topic);
        });
    }

    addPost(post: Post) {
        return this.getTopicById(post.topicId).then(topic => {
            post.createdAt = new Date().toISOString();
            if (!topic.posts) {
                if (post.type === "recap") {
                    throw new Error("Cannot start a topic with a recap");
                }
                topic.posts = [post];
            } else {
                if (post.type === "recap" && topic.posts[topic.posts.length - 1].type === "recap") {
                    throw new Error("Cannot follow a recap with another recap");
                }
                topic.posts.push(post);
            }
        
            return this.topicRepo.save(topic);
        });
    }

    getAllTopics() {
        return this.topicRepo.find();
    }

    getTopicById(id: number) {
        return this.topicRepo.findOne({
            where: {
                id: id
            }
        });
    }
}
