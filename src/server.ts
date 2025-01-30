import express from 'express';
import fs from 'fs';
import { Request, Response } from 'express';
import {
  OAUTH2_CLIENT,
  SCOPES,
  TOKEN_PATH,
  __dirname,
} from './utils/constant.js';
import path from 'path';
import dotenv from 'dotenv';
import punycode from 'punycode/punycode.js';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 5000;

/**
 * Эндпоинт для проверки подлинности гугл приложения, после успешной проверки создаётся token.json
 */
const waitForAuthorization = () => {
  return new Promise((resolve) => {
    app.get('/oauth2callback', async (req: Request, res: Response) => {
      const code = req.query.code as string;
      try {
        const { tokens } = await OAUTH2_CLIENT.getToken(code);
        OAUTH2_CLIENT.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('token successful saved: ' + TOKEN_PATH);
        res.send('validate successful');
        resolve(true);
      } catch (err) {
        console.error('token err:', err);
        res.send('token err');
        resolve(false);
      }
    });

    const authUrl = OAUTH2_CLIENT.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Build the application by the link:', authUrl);
  });
};

/**
 * Чекер на наличие токена для авторизации гугла.
 */
const checkTokenAndAuthorize = async () => {
  try {
    const token = fs.readFileSync(TOKEN_PATH, 'utf8');
    OAUTH2_CLIENT.setCredentials(JSON.parse(token));
    console.log('Токен загружен из файла.');
    return true;
  } catch (err) {
    console.log('Токен отсутствует, требуется авторизация: ' + err);
    return false;
  }
};

/**
 * Зарускает сервер если приложение не авторизовано.
 */
export async function startServer() {
  const isAuthorized = await checkTokenAndAuthorize();
  if (!isAuthorized) {
    app.listen(port, () => {
      console.log(`Сервер запущен на ${port} порту`);
    });
    const result = await waitForAuthorization();
    if (result) {
      console.log('Приложение авторизовано.');
    } else {
      console.error('Авторизация не удалась.');
    }
  } else {
    console.log('Приложение уже авторизовано.');
  }
}
