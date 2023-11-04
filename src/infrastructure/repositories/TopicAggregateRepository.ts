import { Repository } from "typeorm";
import { Topic } from "../models/Topic";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";
import TopicAggregate from "../../application/domain/models/TopicAggregate";
import { TopicState } from "../../application/domain/models/state/TopicState";
import { ITopicAggregateRepository } from "../../application/domain/repositories/ITopicAggregateRepository";
import { Post } from "../models/Post";
import { PostEntity } from "../../application/domain/models/PostEntity";

@injectable()
export class TopicAggregateRepository implements ITopicAggregateRepository {
    private _topicRepo: Repository<Topic>;
    constructor(@inject(TYPES.TopicDataRepo) topicRepo: Repository<Topic>) {
        this._topicRepo = topicRepo;
    }

    save(topic: TopicAggregate) {
        const topicState = topic.getState();
        const topicData = this.mapToData(topicState);
        return this._topicRepo.save(topicData).then(d => this.mapToAggregate(d));
    }

    private mapToData(topicState: TopicState): Topic {
        const topicData = new Topic();
        topicData.id = topicState.id;
        topicData.accountId = topicState.accountId;
        topicData.name = topicState.name;
        topicData.posts = topicState.posts;
        return topicData;
    }

    private mapToAggregate(topicData: Topic): TopicAggregate {
        const topicAggregate = new TopicAggregate(
            topicData.id,
            topicData.accountId,
            topicData.name,
            topicData.posts.map(this.mapToEntity)
        );
        return topicAggregate;
    }

    private mapToEntity(post: Post) {
        return new PostEntity(
            post.id,
            post.topicId,
            post.title,
            post.body,
            post.type,
            post.createdAt
        );
    }
}
