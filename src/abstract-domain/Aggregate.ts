import { MoreThanOneError } from "./errors/MoreThanOneError";
import { InvariantError } from "./errors/InvariantError";
import { Entity } from "./Entity";

export abstract class Aggregate<TState> extends Entity<TState> {
}
