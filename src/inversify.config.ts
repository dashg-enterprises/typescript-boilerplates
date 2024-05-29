import { AccountData } from "./infrastructure/models/AccountData";
import { Container, AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";
import { AccountService, IAccountService } from "./application/AccountService";

import "./presentation/AccountController";
import "./presentation/HealthCheckController";
import { AccountRepo, IAccountRepo } from "./infrastructure/AccountRepo";
import { connectToDb } from "./infrastructure/db";

import { getDbDetails } from "./infrastructure/getDbDetails";

export default async function loadContainer() {

    const container = new Container();

    container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
    container.bind<IAccountRepo>(TYPES.IAccountRepo).to(AccountRepo);

    const dbBindings = new AsyncContainerModule(async bind => {
        const dbEnvironmentDetails = await getDbDetails();
        const connectedDb = await connectToDb(dbEnvironmentDetails);

        bind<Repository<AccountData>>(TYPES.AccountDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(AccountData);
        }).inRequestScope();

    });

    await container.loadAsync(dbBindings);

    return container;
}

