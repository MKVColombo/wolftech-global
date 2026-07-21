const { chromium } = require('C:/tmp/pw-audit/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pages = ['/', '/development', '/careers'];
  const viewports = process.env.AUDIT_DESKTOP_ONLY ? [{name:'desktop',width:1440,height:900}] : [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}];
  const origins = process.env.AUDIT_LOCAL_ONLY ? [{name:'local',url:'http://localhost:8080'}] : [{name:'reference',url:'https://www.wolftechglobal.com'},{name:'local',url:'http://localhost:8080'}];
  for (const viewport of viewports) {
    for (const origin of origins) {
      for (const route of pages) {
        const context = await browser.newContext({ viewport: {width:viewport.width,height:viewport.height}, colorScheme:'dark' });
        const page = await context.newPage();
        await page.goto(origin.url + route, { waitUntil:'networkidle' });
        if (route === '/' && origin.name === 'reference') await page.waitForTimeout(6500);
        if (route === '/' && origin.name === 'local') await page.waitForTimeout(3800);
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y=0; y<height; y+=Math.floor(viewport.height*.72)) { await page.evaluate(pos => scrollTo(0,pos), y); await page.waitForTimeout(180); }
        await page.evaluate(() => scrollTo(0,0)); await page.waitForTimeout(350);
        const slug = route === '/' ? 'home' : route.slice(1);
        await page.screenshot({ path:path.join('C:/tmp/wolftech-audit',`${origin.name}-${slug}-${viewport.name}-scrolled.png`), fullPage:true });
        await context.close();
      }
    }
  }
  await browser.close();
})();
