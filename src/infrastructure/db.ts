import { DataSource, DataSourceOptions } from "typeorm";
import { AccountData } from "./models/AccountData.js";
import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions.js";
import { WishData } from "./models/WishData.js";
import { WishlistData } from "./models/WishlistData.js";

export type DataSourceDetails = {host: string, username: string, password: string};

export async function connectToDb({host, username, password}: DataSourceDetails) {
    const dataSourceConfiguration: SqlServerConnectionOptions = {
        type: "mssql",
        host,
        port: 1433,
        username,
        password,
        logging: true,
        options: {
            encrypt: false // please add this for ms sql
        }
    };

    await initializeDatabase(dataSourceConfiguration);
    
    const dataSource = new DataSource({
        ...dataSourceConfiguration,
        synchronize: true,
        database: "Playground",
        entities: [
            AccountData,
            WishData,
            WishlistData
        ]
    } as SqlServerConnectionOptions);
    
    const initializedDataSource = await dataSource.initialize();
    
    return initializedDataSource;
}

async function initializeDatabase(dataSourceConfiguration: SqlServerConnectionOptions) {
    const dataSource = new DataSource(dataSourceConfiguration);
    const connectedDataSource = await dataSource.initialize();
    const runner = connectedDataSource.createQueryRunner();
    await runner.connect();
    await runner.createDatabase("Playground", true);
    await runner.release();
    await connectedDataSource.destroy();
}