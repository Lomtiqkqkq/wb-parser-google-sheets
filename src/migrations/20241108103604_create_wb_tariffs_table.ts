import { Knex } from 'knex';

/**
 * Миграция для создания таблицы
 * @param knex {Knex}
 * @returns { Promise<void> }
 */
export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wb_tariffs', (table) => {
    table.increments('id').primary();
    table.date('dt_next_box').nullable();
    table.date('dt_till_max').nullable();
    table.string('warehouse_name').notNullable();
    table.integer('box_delivery_and_storage_expr').notNullable();
    table.decimal('box_delivery_base').nullable();
    table.decimal('box_delivery_liter').nullable();
    table.decimal('box_storage_base').nullable();
    table.decimal('box_storage_liter').nullable();
    table.unique(['warehouse_name']);
  });
}

/**
 * Миграция для удаления таблицы
 * @param knex {Knex}
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('wb_tariffs');
}
