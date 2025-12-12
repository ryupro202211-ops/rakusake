import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rakusake/',
  configureServer(server) {
    server.middlewares.use('/__api/save-events', (req, res, next) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const fs = await import('fs');
            const path = await import('path');
            const { events } = JSON.parse(body);

            const fileContent = `export const DATA_VERSION = '${Date.now()}';\n\nexport const initialEvents = ${JSON.stringify(events, null, 4)};`;
            const filePath = path.resolve(__dirname, 'src/utils/seedData.js');

            fs.writeFileSync(filePath, fileContent, 'utf-8');

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
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
})
