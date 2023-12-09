import db from "./infrastructure/db";
import { Account } from "./infrastructure/models/Account";
import { Container, AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";
import { AccountService, IAccountService } from "./application/AccountService";

import "./presentation/AccountController";
import "./presentation/GameController";
import { AccountAggregateRepo, IAccountAggregateRepo } from "./infrastructure/AccountAggregateRepo";
import { IGameService, GameService } from "./application/GameService";
import { IGameAggregateRepo, GameAggregateRepo } from "./infrastructure/GameAggregateRepo";
import { Game } from "./infrastructure/models/Game";

export default async function loadContainer() {

    const container = new Container();

    container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
    container.bind<IAccountAggregateRepo>(TYPES.IAccountAggregateRepo).to(AccountAggregateRepo);
    container.bind<IGameService>(TYPES.IGameService).to(GameService);
    container.bind<IGameAggregateRepo>(TYPES.IGameAggregateRepo).to(GameAggregateRepo);

    const dbBindings = new AsyncContainerModule(async bind => {
        const connectedDb = await db.initialize();

        bind<Repository<Account>>(TYPES.AccountDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(Account);
        }).inRequestScope();

        bind<Repository<Game>>(TYPES.GameDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(Game);
        }).inRequestScope();
        
    });

    await container.loadAsync(dbBindings);

    return container;
}