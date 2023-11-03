import "reflect-metadata";
import db from "./infrastructure/db";
import { Topic } from "./infrastructure/models/Topic";
import { Account } from "./infrastructure/models/Account";
import { AccountService, IAccountService } from "./application/AccountService";
import { ITopicService, TopicService } from "./application/TopicService";
import { Container, AsyncContainerModule, ContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";

import "./presentation/AccountController";
import "./presentation/TopicController";

export default async function loadContainer() {

    const container = new Container();

    const serviceBindings = new ContainerModule(bind => {
        bind<IAccountService>(TYPES.IAccountService).to(AccountService);
        bind<ITopicService>(TYPES.ITopicService).to(TopicService);
    });

    const domainBindings = new ContainerModule(bind => {
        bind<IAccountService>(TYPES.IAccountService).to(AccountService);
        bind<ITopicService>(TYPES.ITopicService).to(TopicService);
    });

    const dbBindings = new AsyncContainerModule(async bind => {
        const connectedDb = await db.initialize();
        bind<Repository<Account>>(TYPES.AccountDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(Account);
        }).inRequestScope();
        bind<Repository<Topic>>(TYPES.TopicDataRepo).toDynamicValue(() => {
            return connectedDb.getRepository(Topic);
        }).inRequestScope();
    });

    container.load(serviceBindings);
    await container.loadAsync(dbBindings);

    return container;
}