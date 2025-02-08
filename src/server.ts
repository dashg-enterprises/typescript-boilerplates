import "reflect-metadata";

import { host } from "./inversify.config";
import { TYPES } from "./TYPES";
import { ExampleData } from "./infrastructure/models/ExampleData";

await host.loadSql({host: 'pgsql', entities: [ExampleData], database: 'psql'}, TYPES.ExampleDataRepository);