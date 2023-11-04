import { Repository } from "typeorm";
import { Topic } from "../../infrastructure/models/Topic";
import { Account } from "../../infrastructure/models/Account";
import { Post } from "../../infrastructure/models/Post";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";
import { ITopicAggregateRepository } from "../domain/repositories/ITopicAggregateRepository";
import TopicAggregate from "../domain/models/TopicAggregate";

export interface ITopicService {
    createTopic(topic: Topic): Promise<Topic>;
    addPost(post: Post): Promise<Topic>;
    getAllTopics(): Promise<Topic[]>;
    getTopicById(id: number): Promise<Topic>;
}

@injectable()
export class TopicService implements ITopicService {
    topicRepo: ITopicAggregateRepository;
    accountRepo: Repository<Account>;
    constructor(
        @inject(TYPES.ITopicAggregateRepository) topicRepo: ITopicAggregateRepository,
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
            const newTopic = this.topicRepo.mapToAggregate(topic);
            return this.topicRepo.save(newTopic)
        }).then(savedTopic => {
            return savedTopic.getState();
        });
    }

    addPost(post: Post) {
        return this.topicRepo.get(post.topicId).then(topic => {
            post.createdAt = new Date().toISOString();
            if (post.type === "entry") {
                topic.addEntry(post);
            } else {
                topic.addRecap(post);
            }
            return this.topicRepo.save(topic);
        }).then(savedTopic => {
            return savedTopic.getState();
        });
    }

    getAllTopics() {
        return this.topicRepo.getAll().then(allTopics => allTopics.map(t => t.getState()));
    }

    getTopicById(id: number) {
        return this.topicRepo.get(id).then(t => t.getState());
    }
}
