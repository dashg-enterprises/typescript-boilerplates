import { TYPES } from "./TYPES.js";

// import "./presentation/AccountController.js";
import "./presentation/HealthCheckController.js";
import "./presentation/WeatherController.js";
import "./presentation/ConfigController.js";
// import "./presentation/WishlistController.js";
import axios, { AxiosStatic } from "axios";
import { Host, HostApi } from "@dashg-enterprises/ddd-platform";
import { IWeatherClient, WeatherClient } from "./infrastructure/weather/WeatherClient.js";
import { ExampleService } from "./application/ExampleService.js";
import { ExampleDao } from "./infrastructure/ExampleDao.js";
import { ExampleController } from "./presentation/ExampleController.js";
import { ExampleData } from "./infrastructure/models/ExampleData.js";

export async function startHost() {
    const container = Host.newContainer();
    container.bind<AxiosStatic>(TYPES.Axios).toConstantValue(axios);
    container.bind<IWeatherClient>(TYPES.IWeatherClient).to(WeatherClient);

    const host = new Host(container);
    await host
        .withConfig()
        .withCrud(
            ExampleController,
            ExampleService, TYPES.IExampleService,
            ExampleDao, TYPES.IExampleDao)
        .loadSql({
            type: 'pgsql',
            database: 'example_db',
            entities: [ExampleData],
            repositories: [TYPES.ExampleDataRepository],
            synchronize: true,
        });
    
    const hostApi = new HostApi(host);
    hostApi.start(80, (port) => console.log(`Example Context up and running on port ${port}!`));

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

}