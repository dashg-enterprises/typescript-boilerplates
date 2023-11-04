import TopicAggregate from "../models/TopicAggregate";

export interface ITopicAggregateRepository {
    save(Topic: TopicAggregate): Promise<TopicAggregate>;
}
