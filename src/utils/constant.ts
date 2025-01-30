import path from 'path';
import * as url from 'node:url';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.resolve(__dirname, '../..', 'credentials.json');
const TOKEN_PATH = path.resolve(__dirname, '../..', 'token.json');
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const { client_id, client_secret } = credentials.installed;
const OAUTH2_CLIENT = new OAuth2Client(client_id, client_secret, REDIRECT_URI);
const SHEET_IDS = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../..', 'sheets.json'), 'utf8'),
) as { sheetIds: Array<string> };

export {
  SCOPES,
  CREDENTIALS_PATH,
  TOKEN_PATH,
  REDIRECT_URI,
  OAUTH2_CLIENT,
  SHEET_IDS,
  __dirname,
};
