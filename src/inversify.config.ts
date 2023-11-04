import "reflect-metadata";
import db from "./infrastructure/db";
import { Topic } from "./infrastructure/models/Topic";
import { Account } from "./infrastructure/models/Account";
import { AccountService, IAccountService } from "./application/services/AccountService";
import { ITopicService, TopicService } from "./application/services/TopicService";
import { Container, AsyncContainerModule, ContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";
import { IAccountAggregateRepository } from "./application/domain/repositories/IAccountAggregateRepository";
import { AccountAggregateRepository } from "./infrastructure/repositories/AccountAggregateRepository";

import "./presentation/AccountController";
import "./presentation/TopicController";
import "./presentation/PostController";
import { ITopicAggregateRepository } from "./application/domain/repositories/ITopicAggregateRepository";
import { TopicAggregateRepository } from "./infrastructure/repositories/TopicAggregateRepository";

export default async function loadContainer() {

    const container = new Container();

    const serviceBindings = new ContainerModule(bind => {
        bind<IAccountService>(TYPES.IAccountService).to(AccountService);
        bind<ITopicService>(TYPES.ITopicService).to(TopicService);
    });

    const domainBindings = new ContainerModule(bind => {
        bind<IAccountAggregateRepository>(TYPES.IAccountAggregateRepository).to(AccountAggregateRepository);
        bind<ITopicAggregateRepository>(TYPES.ITopicAggregateRepository).to(TopicAggregateRepository);
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

    container.load(domainBindings);
    container.load(serviceBindings);
    await container.loadAsync(dbBindings);

    return container;
}