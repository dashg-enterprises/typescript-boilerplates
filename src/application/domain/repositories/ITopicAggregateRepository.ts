import { Topic } from "../../../infrastructure/models/Topic";
import TopicAggregate from "../models/TopicAggregate";
import { TopicState } from "../models/state/TopicState";

export interface ITopicAggregateRepository {
    save(Topic: TopicAggregate): Promise<TopicAggregate>;
    get(id: number): Promise<TopicAggregate>;
    getAll(): Promise<TopicAggregate[]>;
    mapToData(topicState: TopicState): Topic;
    mapToAggregate(topicData: Topic): TopicAggregate;
}
