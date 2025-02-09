import "reflect-metadata";

import { host } from "./inversify.config.js";
import { TYPES } from "./TYPES.js";
import { ExampleData } from "./infrastructure/models/ExampleData.js";

await host.loadSql({host: 'pgsql', entities: [ExampleData], database: 'localhost:5432'}, [TYPES.ExampleDataRepository]);