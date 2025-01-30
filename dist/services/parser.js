import fetch from 'node-fetch';
import { formatDate } from '../utils/utils.js';
import dotenv from 'dotenv';
import { __dirname } from '../utils/constant.js';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/**
 * Запрос на получение данных о тарифах.
 * @returns { Promise<TariffsData> }
 */
export async function parserBox() {
    try {
        const res = await fetch('https://common-api.wildberries.ru/api/v1/tariffs/box?date=' +
            formatDate(new Date()), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.API_KEY || '',
            },
        });
        if (res.status !== 200) {
            throw JSON.stringify({ status: res.status, message: await res.json() });
        }
        const json = (await res.json());
        return json.response.data;
    }
    catch (error) {
        throw 'Ошибка при запросе к API wb: ' + error;
    }
}
