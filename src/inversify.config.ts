import { AccountData } from "./infrastructure/models/AccountData.js";
import { Container, AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { TYPES } from "./TYPES.js";
import { AccountService, IAccountService } from "./application/AccountService.js";

// import "./presentation/AccountController.js";
import "./presentation/HealthCheckController.js";
import "./presentation/WeatherController.js";
import "./presentation/ConfigController.js";
// import "./presentation/WishlistController.js";
import { AccountRepo, IAccountRepo } from "./infrastructure/AccountRepo.js";
import { connectToDb } from "./infrastructure/db.js";

import { getDbDetails } from "./infrastructure/getDbDetails.js";
import { WishlistData } from "./infrastructure/models/WishlistData.js";
import { IWishlistService, WishlistService } from "./application/WishlistService.js";
import { IWishlistRepo, WishlistRepo } from "./infrastructure/WishlistRepo.js";
import { ConfigProvider, IConfigProvider } from "./infrastructure/ConfigProvider.js";
import { SSMClient } from "@aws-sdk/client-ssm";
import axios, { AxiosStatic } from "axios";
import { IWeatherClient, WeatherClient } from "./infrastructure/WeatherClient.js";

export default async function loadContainer() {

    const container = new Container();

    container.bind<IConfigProvider>(TYPES.IConfigProvider).to(ConfigProvider);
    container.bind<SSMClient>(TYPES.SSMClient).toDynamicValue(() => new SSMClient({}));
    container.bind<AxiosStatic>(TYPES.Axios).toConstantValue(axios);
    container.bind<IWeatherClient>(TYPES.IWeatherClient).to(WeatherClient);

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

