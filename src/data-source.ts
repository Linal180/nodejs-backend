import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from './config';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: false,
    logging: false,
    migrationsRun: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
})
