// DTO - data transfer object
export class GameDto {
    id: number;
    ownerId: number;
    name: string;
    invitations: InvitationDto[];
}

export class InvitationDto {
    id: number;
    message: string;
    senderId: number;
    recipientId: number;
    gameId: number;
}