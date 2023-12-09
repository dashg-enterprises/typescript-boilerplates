import { DataSource } from "typeorm";
import { Account } from "./models/Account";
import { Game } from "./models/Game";
import { Invitation } from "./models/Invitation";

const db = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "playground-user",
    password: "pass",
    database: "Playground",
    entities: [
        Account,
        Game, 
        Invitation,
    ],
    logging: true,
    synchronize: true,
    options: {
        encrypt: false // please add this for ms sql
    }
});

export default db;