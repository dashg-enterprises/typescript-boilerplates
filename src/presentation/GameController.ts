import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { IGameService } from "../application/GameService";
import { GameDto } from "./models/GameDto";

@controller("/games")
export default class GameController extends BaseHttpController {
    service: IGameService;
    constructor(@inject(TYPES.IGameService) service: IGameService) {
        super();
        this.service = service;
    }

    @httpGet("/")
    private async getGames(request: Request) {
        const Games = await this.service.getAll();
        return Games;
    }

    @httpPost("/")
    private async createGame(request: Request) {
        const newGame = request.body as GameDto;
        if (newGame.name == null) {
            return this.badRequest("Name must at least be provided.");
        }
        if (!newGame.invitations?.length) {
            return this.badRequest("At least one other player must be invited.");
        }

        const savedGame = await this.service.create(newGame);
        return savedGame;
    }
}