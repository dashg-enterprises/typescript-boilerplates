import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "../TYPES";
import { GameAggregate, InvitationEntity } from "../application/models/GameAggregate";
import { Game } from "./models/Game";
import { InvitationDto } from "../presentation/models/GameDto";

export interface IGameAggregateRepo {
    // factory method -> purpose is to call the constructor
    create(name: string, ownerId: number, id?: number, invitations?: InvitationEntity[]): GameAggregate;

    getById(id: number): Promise<GameAggregate>;
    getAll(): Promise<GameAggregate[]>;
    save(Game: GameAggregate): Promise<GameAggregate>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class GameAggregateRepo implements IGameAggregateRepo {
    private readonly dataRepo: Repository<Game>;
    constructor(@inject(TYPES.GameDataRepo) dataRepo: Repository<Game>) {
        this.dataRepo = dataRepo;
    }

    // factory method, just calling constructor for us
    create(name: string, ownerId: number, id: number = null, invitations: InvitationEntity[] = []): GameAggregate {
        return new GameAggregate(name, ownerId, id, invitations);
    }

    async getById(id: number): Promise<GameAggregate> {
        const dataModel = await this.dataRepo.findOneBy({id: id});
        return this.mapToAggregateModel(dataModel);
    }
    async getAll(): Promise<GameAggregate[]> {
        const dataModels = await this.dataRepo.find();
        return dataModels.map(dataModel => this.mapToAggregateModel(dataModel));
    }
    async save(Game: GameAggregate): Promise<GameAggregate> {
        const dataModel = this.mapToDataModel(Game);
        const savedDataModel = await this.dataRepo.save(dataModel);    
        return this.mapToAggregateModel(savedDataModel);
    }
    async delete(id: number): Promise<boolean> {
        try {
            await this.dataRepo.delete(id);
            return true;
        } catch(error) {
            return false;
        }
    }

    private mapToDataModel(game: GameAggregate) {
        const state = game.getState();
        const dataModel = new Game();
        dataModel.id = state.id;
        dataModel.name = state.name;
        dataModel.accountId = state.ownerId;
        dataModel.invitations = state.invitations.map(invitation => ({
            id: invitation.id,
            gameId: invitation.gameId,
            accountId: invitation.recipientId,
            message: invitation.message
        }))
        return dataModel;
    }

    private mapToAggregateModel(gameData: Game) {
        const game = this.create(gameData.name, gameData.accountId, gameData.id, gameData.invitations.map(i => new InvitationEntity(i.gameId, gameData.accountId, i.accountId, i.id, i.message)));
        return game;
    }

}