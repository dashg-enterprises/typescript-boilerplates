export class PostState {
    constructor(
        readonly id: number,
        readonly topicId: number,
        readonly title: string,
        readonly body: string,
        readonly type: string,
        readonly createdAt: string
    ) {}
}
