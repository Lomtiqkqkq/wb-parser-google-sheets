import { db } from '../db.js';
import { TariffsData } from '../../types/interfaces.js';

/**
 * Сохранение данных в СУБД.
 * @param data {TariffsData}
 * @returns { Promise<void> }
 */
export async function saveToDatabase(data: TariffsData): Promise<void> {
  try {
    const { dtNextBox, dtTillMax, warehouseList } = data;
    for (const warehouse of warehouseList) {
      await db('wb_tariffs')
        .insert({
          dt_next_box: dtNextBox ? new Date(dtNextBox) : null,
          dt_till_max: new Date(dtTillMax),
          warehouse_name: warehouse.warehouseName,
          box_delivery_and_storage_expr: parseFloat(
            warehouse.boxDeliveryAndStorageExpr.replace(',', '.'),
          ),
          box_delivery_base:
            warehouse.boxDeliveryBase !== '-'
              ? parseFloat(warehouse.boxDeliveryBase.replace(',', '.'))
              : null,
          box_delivery_liter:
            warehouse.boxDeliveryLiter !== '-'
              ? parseFloat(warehouse.boxDeliveryLiter.replace(',', '.'))
              : null,
          box_storage_base:
            warehouse.boxStorageBase !== '-'
              ? parseFloat(warehouse.boxStorageBase.replace(',', '.'))
              : null,
          box_storage_liter:
            warehouse.boxStorageLiter !== '-'
              ? parseFloat(warehouse.boxStorageLiter.replace(',', '.'))
              : null,
        })
        .onConflict(['warehouse_name'])
        .merge();
    }
    console.log('Data in the db successfully added or updated');
  } catch (error) {
    throw 'Error while maintaining data: ' + error;
  }
}
