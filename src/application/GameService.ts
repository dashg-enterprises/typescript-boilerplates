import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { GameDto } from "../presentation/models/GameDto";
import { GameAggregate } from "./models/GameAggregate";
import { DomainError } from "./models/DomainError";
import { IGameAggregateRepo } from "../infrastructure/GameAggregateRepo";

export interface IGameService {
    getAll(): Promise<GameDto[]>;
    getById(id: number): Promise<GameDto>;
    create(game: GameDto): Promise<GameDto>;
    update(game: GameDto): Promise<GameDto>;
    delete(id: number): Promise<boolean>;
}

@injectable()
export class GameService implements IGameService {
    private readonly repo: IGameAggregateRepo;
    constructor(@inject(TYPES.IGameAggregateRepo) repo: IGameAggregateRepo) {
        this.repo = repo;
    }
    async getAll(): Promise<GameDto[]> {
        const games = await this.repo.getAll();
        return games.map(game => this.mapToDto(game));
    }
    async getById(id: number): Promise<GameDto> {
        const game = await this.repo.getById(id);
        return this.mapToDto(game);
    }

    async create(gameDto: GameDto): Promise<GameDto> {
        const game = this.repo.create(gameDto.name, gameDto.ownerId);
        gameDto.invitations.forEach(invitation => {
            game.invite(invitation.recipientId);
        });
        const savedGame = await this.repo.save(game);
        return this.mapToDto(savedGame);
    }

    async update(gameDto: GameDto): Promise<GameDto> {
        const game = await this.repo.getById(gameDto.id);

        const savedGame = await this.repo.save(game);
        return this.mapToDto(savedGame);
    }
    async delete(id: number): Promise<boolean> {
        return await this.repo.delete(id);
    }

    private mapToDto(game: GameAggregate) {
        const state = game.getState();
        const dto = new GameDto();
        dto.id = state.id;
        dto.name = state.name;
        dto.invitations = state.invitations;
        return dto;
    }
}