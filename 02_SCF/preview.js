// Render single frames at given times: node preview.js 1.5 4 8.5 ...
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const times = process.argv.slice(2).map(Number);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE:', m.text()); });
  await page.goto('file://' + path.resolve('video.html'));
  await page.waitForFunction(() => window.ready === true);
  await page.evaluate(() => document.fonts.ready);
  for (const t of times) {
    await page.evaluate(t => window.seek(t), t);
    await page.waitForTimeout(30);
    const out = `frames_preview/t${String(t).replace('.', '_')}.png`;
    await page.screenshot({ path: out });
    console.log('wrote', out);
  }
  await browser.close();
})();
