import { AccountState } from "./state/AccountState";
import { PasswordStrengthError } from "../errors/PasswordStrengthError";
import { Aggregate } from "../../../abstract-domain/Aggregate";
import { InvariantError } from "../../../abstract-domain/errors/InvariantError";
import { TopicState } from "./state/TopicState";
import { PostEntity } from "./PostEntity";
import { PostState } from "./state/PostState";

export default class TopicAggregate extends Aggregate<TopicState> {
    private _accountId: number;
    private _name: string;
    private _posts: PostEntity[];
    constructor(id: number, accountId: number, name: string, posts: PostEntity[]) {
        super(id);
        this._accountId = accountId;
        this._name = name;
        this._posts = posts;
        this.validate();
    }

    private fromState(post: PostState) {
        return new PostEntity(
            post.id,
            post.topicId,
            post.title,
            post.body,
            post.type,
            post.createdAt
        );
    }

    protected gatherInvariants(): InvariantError[] {       
        return [];
    }

    addEntry(entry: PostState) {
        if (entry.type !== "entry") throw new InvariantError("Post must be an entry.");

        this._posts.push(this.fromState(entry));
    }

    addRecap(recap: PostState) {
        if (recap.type !== "recap") throw new InvariantError("Post must be a recap.");
        if (this.mostRecentPost().isRecap()) throw new InvariantError("A recap cannot be followed by another recap.");

        this._posts.push(this.fromState(recap));
    }

    mostRecentPost() {
        return this._posts[this._posts.length - 1];
    }

    getState(): TopicState {
        return {
            id: this._id,
            accountId: this._accountId,
            name: this._name,
            posts: this._posts.map(p => p.getState()),
        }
    }
}

