import { Entity } from "../../../abstract-domain/Entity";
import { InvariantError } from "../../../abstract-domain/errors/InvariantError";
import { PostState } from "./state/PostState";

export class PostEntity extends Entity<PostState> {
    constructor(
        id: number,
        private _topicId: number,
        private _title: string,
        private _body: string,
        private _type: string, // "story" or "recap
        private _createdAt: string
    ) {
        super(id);
    }

    getState(): PostState {
        return {
            id: this._id,
            topicId: this._topicId,
            title: this._title,
            body: this._body,
            type: this._type,
            createdAt: this._createdAt
        };
    }

    isRecap() {
        return this._type === "recap";
    }

    protected gatherInvariants(): InvariantError[] {
        return [];
    }
}