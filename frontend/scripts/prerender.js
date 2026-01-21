import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

// Simple static file server for the dist folder
function createStaticServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(distPath, req.url === '/' ? 'index.html' : req.url);

      // Handle SPA routes - serve index.html for non-file requests
      if (!filePath.includes('.')) {
        filePath = join(distPath, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          'html': 'text/html',
          'js': 'application/javascript',
          'css': 'text/css',
          'svg': 'image/svg+xml',
          'png': 'image/png',
          'jpg': 'image/jpeg',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      console.log(`Static server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function prerender() {
  const port = 4173;
  const server = await createStaticServer(port);

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    console.log('Navigating to landing page...');
    await page.goto(`http://localhost:${port}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for content to render
    await page.waitForSelector('.landing-page', { timeout: 10000 });

    // Additional wait for any animations/transitions
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Extracting HTML...');
    const html = await page.content();

    // Write pre-rendered HTML
    const indexPath = join(distPath, 'index.html');
    writeFileSync(indexPath, html);
    console.log('Pre-rendered HTML saved to dist/index.html');

    // Verify the content
    const savedHtml = readFileSync(indexPath, 'utf-8');
    if (savedHtml.includes('Transformar a') && savedHtml.includes('Leitura')) {
      console.log('Success! Landing page content is in the HTML.');
    } else {
      console.warn('Warning: Landing page content may not be fully rendered.');
    }

  } catch (error) {
    console.error('Pre-rendering failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender();
