import { envConfig } from "./env.config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: envConfig.DB_TYPE,
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USERNAME,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    entities: ['./src/entities/*.ts'],  
    synchronize: true,
    logging: false,
    migrations: []
})

AppDataSource.initialize()
    .then(async () =>{
        console.log("[postgres]: Database connection established.")        
    })
    .catch((error) => console.log(error));