import knex from 'knex';
import knexfile from '../config/knexfile.js';

const db = knex({ ...knexfile.development });

/**
 * Создание миграций.
 */
async function migration() {
  try {
    await db.migrate.latest();
    console.log('migration completed');
  } catch (error) {
    throw new Error(`error migration: ${error}`);
  }
}

export { db, migration };
