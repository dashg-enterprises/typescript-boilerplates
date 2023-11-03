import { DataSource } from "typeorm";
import { Topic } from "./models/Topic";
import { Account } from "./models/Account";
import { Post } from "./models/Post";

const db = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "playground-user",
    password: "pass",
    database: "Playground",
    entities: [
        Account,
        Topic,
        Post
    ],
    logging: true,
    synchronize: true,
    options: {
        encrypt: false // please add this for ms sql
    }
});

export default db;