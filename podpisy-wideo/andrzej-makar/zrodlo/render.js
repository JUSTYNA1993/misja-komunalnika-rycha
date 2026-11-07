// Renderuje klatki animacji podpisu do PNG z przezroczystością.
// Użycie: node render.js <169|916> <shadow 1|0> <katalog_wyjściowy> [fps]
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const [fmt, shadow, out, fpsArg] = process.argv.slice(2);
const fps = parseInt(fpsArg || '30', 10);
(async () => {
  const [W, H] = fmt === '169' ? [1920, 1080] : [1080, 1920];
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + path.resolve(__dirname, 'podpis.html') + `?f=${fmt}&shadow=${shadow}&t=0`);
  await p.evaluate(() => document.fonts.ready);
  const dur = await p.evaluate(() => window.DUR);
  const n = Math.round(dur * fps);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => window.seek(t), i / fps);
    await p.screenshot({ path: path.join(out, `f${String(i).padStart(4, '0')}.png`), omitBackground: true });
  }
  await b.close();
  console.log(`${fmt} shadow=${shadow}: ${n} klatek`);
})();
