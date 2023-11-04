import { PostState } from "./PostState";

export class TopicState {
    constructor(
        readonly id: number,    
        readonly accountId: number,    
        readonly name: string,    
        readonly posts: PostState[],
    ) {}
}
