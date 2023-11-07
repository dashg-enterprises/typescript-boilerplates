import db from "./infrastructure/db";
import { Account } from "./infrastructure/models/Account";
import { Container, AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";

import "./presentation/AccountController";

export default async function loadContainer() {

    const container = new Container();

    // container.bind<IExample>(TYPES.IExample).to(ParticularExample);

    const dbBindings = new AsyncContainerModule(async bind => {
        const connectedDb = await db.initialize();
        bind<Repository<Account>>(TYPES.AccountDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(Account);
        }).inRequestScope();
    });

    await container.loadAsync(dbBindings);

    return container;
}