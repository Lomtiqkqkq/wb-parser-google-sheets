import knex from 'knex';
import knexfile from '../config/knexfile.js';
const db = knex({ ...knexfile.development });
/**
 * Создание миграций.
 */
async function migration() {
    try {
        await db.migrate.latest();
        console.log('Миграции успешно выполнены');
    }
    catch (error) {
        throw new Error(`Ошибка выполнения миграций: ${error}`);
    }
}
export { db, migration };
