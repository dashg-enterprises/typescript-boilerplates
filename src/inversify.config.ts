import { AccountData } from "./infrastructure/models/AccountData";
import { Container, AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES";
import { AccountService, IAccountService } from "./application/AccountService";

// import "./presentation/AccountController";
import "./presentation/HealthCheckController";
// import "./presentation/WishlistController";
import { AccountRepo, IAccountRepo } from "./infrastructure/AccountRepo";
import { connectToDb } from "./infrastructure/db";

import { getDbDetails } from "./infrastructure/getDbDetails";
import { WishlistData } from "./infrastructure/models/WishlistData";
import { IWishlistService, WishlistService } from "./application/WishlistService";
import { IWishlistRepo, WishlistRepo } from "./infrastructure/WishlistRepo";

export default async function loadContainer() {

    const container = new Container();

    // container.bind<IAccountService>(TYPES.IAccountService).to(AccountService);
    // container.bind<IAccountRepo>(TYPES.IAccountRepo).to(AccountRepo);

    // container.bind<IWishlistService>(TYPES.IWishlistService).to(WishlistService);
    // container.bind<IWishlistRepo>(TYPES.IWishlistRepo).to(WishlistRepo);

    // const dbBindings = new AsyncContainerModule(async bind => {
    //     const dbEnvironmentDetails = await getDbDetails();
    //     const connectedDb = await connectToDb(dbEnvironmentDetails);

    //     bind<Repository<AccountData>>(TYPES.AccountDataRepo).toDynamicValue(() => {
    //         return connectedDb.getRepository(AccountData);
    //     }).inRequestScope();

    //     bind<Repository<WishlistData>>(TYPES.WishlistDataRepo).toDynamicValue(() => {
    //         return connectedDb.getRepository(WishlistData);
    //     }).inRequestScope();

    // });

    // await container.loadAsync(dbBindings);

    return container;
}

