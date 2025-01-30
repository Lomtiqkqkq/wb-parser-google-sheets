import { db } from '../db/db.js';
/**
 * Запрос к бд на извлечение данных и сортировка в порядке возрастания по значению box_delivery_and_storage_expr
 * @returns { Promise<Array[TariffsDataDB]> }
 */
export async function getSortedData() {
    try {
        const data = await db('wb_tariffs')
            .select('*')
            .orderBy('box_delivery_and_storage_expr', 'asc');
        return data;
    }
    catch (error) {
        console.error('Ошибка при извлечении данных из базы:', error);
        throw error;
    }
}
