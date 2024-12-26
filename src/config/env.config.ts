import dotenv from 'dotenv';
export type DatabaseType = 'postgres';
dotenv.config();

export const envConfig ={
    PORT: process.env.PORT,
    DB_TYPE: process.env.DB_TYPE as DatabaseType,
    DB_PORT: parseInt(process.env.DB_PORT ||'5432'),
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS,
    JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH
};








