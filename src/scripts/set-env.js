const fs = require('fs');
const path = require('path');

// Carga .env solo si existe (en local); en Vercel/Railway ya vienen del panel
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const targetPath = path.resolve(__dirname, '../environments/environment.ts');

const content = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  backendUrl: '${process.env.BACKEND_URL}'
};
`;

fs.writeFileSync(targetPath, content);
console.log(`Environment generado en ${targetPath}`);
