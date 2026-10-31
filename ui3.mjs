import puppeteer from "puppeteer-core";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b=await puppeteer.launch({executablePath:CHROME,headless:true});
const p=await b.newPage();
const shots=[];
async function shot(url,name,w=1280,h=800){await p.setViewport({width:w,height:h});await p.goto("http://localhost:3000"+url,{waitUntil:"networkidle0",timeout:60000});await new Promise(r=>setTimeout(r,900));await p.screenshot({path:`/tmp/u3-${name}.png`});shots.push(name);}
await shot("/watch","watch");
await shot("/changelog","changelog");
await shot("/completion","completion");
await shot("/walkthrough","walkthrough");
await shot("/search","search");
await shot("/secrets","secrets");
// mobile nav drawer
await p.setViewport({width:390,height:844});
await p.goto("http://localhost:3000/",{waitUntil:"networkidle0"});
await p.evaluate(()=>document.querySelector('button[aria-label*="navigation" i],button[aria-label*="menu" i]')?.click());
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:"/tmp/u3-mobilenav.png"});
// global search dialog
await p.setViewport({width:1280,height:800});
await p.goto("http://localhost:3000/",{waitUntil:"networkidle0"});
await p.keyboard.down("Meta");await p.keyboard.press("k");await p.keyboard.up("Meta");
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:"/tmp/u3-cmdk.png"});
console.log(shots.join(","));
await b.close();
