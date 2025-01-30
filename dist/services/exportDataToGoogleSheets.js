import { getSortedData } from './getSortedData.js';
import { google } from 'googleapis';
import { OAUTH2_CLIENT, TOKEN_PATH } from '../utils/constant.js';
import fs from 'fs';
import { extractSheetId } from '../utils/utils.js';
/**
 * Функция для экспорта данных из СУБД в гугл таблицы.
 * @param sheetIds {Array<string>}
 * @returns { Promise<void> }
 */
export async function exportDataToGoogleSheets(sheetIds) {
    sheetIds = extractSheetId(sheetIds);
    const token = fs.readFileSync(TOKEN_PATH, 'utf8');
    OAUTH2_CLIENT.setCredentials(JSON.parse(token));
    const sheets = google.sheets({ version: 'v4', auth: OAUTH2_CLIENT });
    const data = await getSortedData();
    if (!data)
        return;
    const values = data.map((item) => [
        item.dt_next_box,
        item.dt_till_max,
        item.warehouse_name,
        item.box_delivery_and_storage_expr,
        item.box_delivery_base,
        item.box_delivery_liter,
        item.box_storage_base,
        item.box_storage_liter,
    ]);
    for (const sheetId of sheetIds) {
        try {
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: 'stocks_coefs!A1',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [
                        [
                            'dt_next_box',
                            'dt_till_max',
                            'warehouse_name',
                            'box_delivery_and_storage_expr',
                            'box_delivery_base',
                            'box_delivery_liter',
                            'box_storage_base',
                            'box_storage_liter',
                        ],
                        ...values,
                    ],
                },
            });
            console.log(`Данные успешно выгружены в Google Таблицу с ID ${sheetId}`);
        }
        catch (error) {
            console.error(`Ошибка при выгрузке данных в Google Таблицу с ID ${sheetId}:`, error);
            throw error;
        }
    }
}
