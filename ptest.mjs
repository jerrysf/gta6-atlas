import puppeteer from "puppeteer-core";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b=await puppeteer.launch({executablePath:CHROME,headless:true});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
const errs=[];p.on("console",m=>{if(m.type()==="error")errs.push(m.text().slice(0,80))});
// homepage hero
await p.goto("http://localhost:3000",{waitUntil:"networkidle0",timeout:60000});
await p.screenshot({path:"/tmp/p-hero.png"});
// media gallery + lightbox
await p.goto("http://localhost:3000/media",{waitUntil:"networkidle0"});
await new Promise(r=>setTimeout(r,1500));
await p.screenshot({path:"/tmp/p-media.png"});
await p.evaluate(()=>document.querySelectorAll("button[aria-label^='View']")[5]?.click());
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({path:"/tmp/p-lightbox.png"});
const lb=await p.evaluate(()=>!!document.querySelector('[role="dialog"]'));
await p.keyboard.press("Escape");
// prev/next on a vehicle + guide
await p.goto("http://localhost:3000/vehicles/bravado-banshee",{waitUntil:"networkidle0"});
const pn1=await p.evaluate(()=>[...document.querySelectorAll("nav[aria-label*='revious'] a")].map(a=>a.href.split('/').pop()));
await p.goto("http://localhost:3000/guides/gta-6-file-size",{waitUntil:"networkidle0"});
const pn2=await p.evaluate(()=>[...document.querySelectorAll("nav[aria-label*='guides'] a")].map(a=>a.href.split('/').pop()));
// feed + nav overflow check
const feed=await(await fetch("http://localhost:3000/feed.xml")).text();
const navCount=await p.evaluate(()=>document.querySelectorAll('nav[aria-label="Primary"] a').length);
console.log("lightbox:",lb,"| vehPrevNext:",pn1,"| guidePrevNext:",pn2,"| rss:",feed.includes("<item>"),"| navItems:",navCount,"| errors:",errs.length,errs.slice(0,3));
await b.close();
