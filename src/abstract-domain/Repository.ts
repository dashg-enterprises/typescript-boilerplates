import { Aggregate } from "./Aggregate";

export default interface Repository<TAggregate> {
    save(aggregate: TAggregate): TAggregate;
    get(id: number): TAggregate;
    getAll(): TAggregate[];
} 