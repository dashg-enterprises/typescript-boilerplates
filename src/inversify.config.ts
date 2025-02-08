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
import { WishlistData } from "./infrastructure/models/WishlistData.js";
import { IWishlistService, WishlistService } from "./application/WishlistService.js";
import { IWishlistRepo, WishlistRepo } from "./infrastructure/WishlistRepo.js";
import { SSMClient } from "@aws-sdk/client-ssm";
import axios, { AxiosStatic } from "axios";
import { Host } from "@dashg-enterprises/ddd-platform";
import { IWeatherClient, WeatherClient } from "./infrastructure/weather/WeatherClient.js";
import { ExampleService } from "./application/ExampleService.js";
import { ExampleDao } from "./infrastructure/ExampleDao.js";
import { ExampleController } from "./presentation/ExampleController.js";

const container = Host.newContainer();

container.bind<SSMClient>(TYPES.SSMClient).toDynamicValue(() => new SSMClient({}));
container.bind<AxiosStatic>(TYPES.Axios).toConstantValue(axios);
container.bind<IWeatherClient>(TYPES.IWeatherClient).to(WeatherClient);

export const host = new Host(container);
host.withCrud(ExampleController, ExampleService, TYPES.IExampleService, ExampleDao, TYPES.IExampleDao);

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
