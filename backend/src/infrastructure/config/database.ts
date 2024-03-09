import "reflect-metadata"
import { DataSource } from "typeorm";

export const InstanceDB = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    logging: true,
    synchronize: true,
    // entities: [
        // Client,
    // ]
});
