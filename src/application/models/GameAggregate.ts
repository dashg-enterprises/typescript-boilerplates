// Domain model
export class GameAggregate {
    private id?: number;
    private ownerId: number;
    private name: string;
    private invitations: InvitationEntity[];
    constructor(name: string, ownerId: number, id: number = null, invitedPlayers: number[] = []) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.invitations = [];
        invitedPlayers.forEach(invitedPlayer => this.invite(invitedPlayer));
    }

    invite(playerId: number) {
        this.invitations.push(new InvitationEntity(this.id, this.ownerId, playerId));
    }
    
    getState() {
        return {
            id: this.id,
            ownerId: this.ownerId,
            name: this.name,
            invitations: this.invitations.map(invitation => {
                const invitationState = invitation.getState();
                return {
                    id: invitationState.id,
                    message: invitationState.message,
                    senderId: invitationState.senderId,
                    recipientId: invitationState.recipientId,
                    gameId: invitationState.gameId,
                }
            })

        }
    }
}

export class InvitationEntity {
    private id?: number;
    private gameId: number;
    private senderId: number;
    private recipientId: number;
    private message?: string;
    constructor(gameId: number, senderId: number, recipientId: number, id: number = null, message: string = null) {
        this.id = id;
        this.gameId = gameId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        if (!message) this.message = `Player ${this.senderId} would like you to join game ${this.gameId}.`
    }

    getState() {
        return {
            id: this.id,
            message: this.message,
            gameId: this.gameId,
            senderId: this.senderId,
            recipientId: this.recipientId
        }
    }
}