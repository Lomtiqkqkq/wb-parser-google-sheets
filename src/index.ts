import { saveToDatabase } from './db/repositories/saveToDatabase.js';
import cron from 'node-cron';
import { exportDataToGoogleSheets } from './services/exportDataToGoogleSheets.js';
import { startServer } from './server.js';
import { migration } from './db/db.js';
import { SHEET_IDS } from './utils/constant.js';
import { parserBox } from './services/parser.js';

(async () => {
  try {
    await migration();
    await startServer();

    /**
     * Ежечасный парсер данных с api wb
     */
    cron.schedule('0 * * * *', async () => {
      console.log('Starting the problem of obtaining data');
      const data = await parserBox();
      await saveToDatabase(data);
    });

    /**
     * Регулярная выгрузка в гугл таблицы
     */
    cron.schedule('59 23 * * *', async () => {
      console.log('Starting the problem of unloading data in Google tables');
      await exportDataToGoogleSheets(SHEET_IDS.sheetIds);
    });
  } catch (err) {
    console.error(err);
  }
})();
