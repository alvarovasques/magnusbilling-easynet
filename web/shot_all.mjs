import { chromium } from 'playwright-core';
import fs from 'node:fs';
const base='/opt/pw-browsers';
const dir=fs.readdirSync(base).find(d=>d.startsWith('chromium-'));
const exe=`${base}/${dir}/chrome-linux/chrome`;
const b=await chromium.launch({executablePath:exe,args:['--no-sandbox','--single-process']});
const p=await b.newPage({viewport:{width:1280,height:800}});
for (const [route,out] of [['/login','/tmp/login2.png'],['/demo','/tmp/demo2.png']]) {
  await p.goto('http://127.0.0.1:4173'+route,{waitUntil:'load',timeout:15000}).catch(()=>{});
  await p.waitForTimeout(1400);
  await p.screenshot({path:out});
  console.log('shot',route);
}
await b.close();
