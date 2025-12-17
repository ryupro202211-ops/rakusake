import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
      {
        name: 'save-events',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url.includes('save-events')) {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', () => {
                try {
                  const { events } = JSON.parse(body);

                  const fileContent = `export const DATA_VERSION = '${Date.now()}';\n\nexport const initialEvents = ${JSON.stringify(events, null, 4)};`;
                  const filePath = path.resolve(process.cwd(), 'src/utils/seedData.js');
                  const logPath = path.resolve(process.cwd(), 'server_debug.log');

                  try {
                    fs.writeFileSync(filePath, fileContent, 'utf-8');
                    fs.appendFileSync(logPath, `[${new Date().toISOString()}] SUCCESS. Wrote to ${filePath} (URL: ${req.url})\n`);
                    res.statusCode = 200;
                    res.end(JSON.stringify({ success: true }));
                  } catch (err) {
                    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ERROR writing to ${filePath}: ${err.message}\n`);
                    throw err;
                  }
                } catch (e) {
                  console.error(e);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
  };

  if (command === 'build') {
    config.base = '/rakusake/';
  }

  return config;
})
