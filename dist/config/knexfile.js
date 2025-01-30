import dotenv from 'dotenv';
import path from 'path';
import { __dirname } from '../utils/constant.js';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log(process.env);
export default {
    development: {
        client: 'pg',
        connection: {
            host: String(process.env.DB_HOST) || 'localhost',
            user: String(process.env.DB_USER),
            port: Number(process.env.DB_PORT) || '5432',
            password: String(process.env.DB_PASSWORD),
            database: String(process.env.DB_NAME),
        },
        migrations: {
            directory: './dist/migrations',
        },
    },
};
