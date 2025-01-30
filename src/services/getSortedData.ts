import { db } from '../db/db.js';
import { TariffsDataDB } from '../types/interfaces.js';

/**
 * Запрос к бд на извлечение данных и сортировка в порядке возрастания по значению box_delivery_and_storage_expr
 * @returns { Promise<Array[TariffsDataDB]> }
 */
export async function getSortedData(): Promise<Array<TariffsDataDB>> {
  try {
    const data = await db('wb_tariffs')
      .select('*')
      .orderBy('box_delivery_and_storage_expr', 'asc');
    return data;
  } catch (error) {
    console.error('Error when extracting data from the database:', error);
    throw error;
  }
}
