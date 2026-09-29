const VERSION="225040902c2f0dad";
const SHELL='buhuan-shell-'+VERSION;
const CONTENT='buhuan-content-'+VERSION;
const URLS=["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "favicon.svg", "icon-192.png", "icon-512.png", "offline-files.json", "data/book.json", "analytics.js"];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('buhuan-shell-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
e.respondWith((async()=>{const content=await caches.open(CONTENT);let hit=await content.match(e.request);if(hit)return hit;const shell=await caches.open(SHELL);hit=await shell.match(e.request);if(hit)return hit;
try{const r=await fetch(e.request);if(r.ok&&r.type!=='opaque')await content.put(e.request,r.clone());return r;}catch(err){if(e.request.mode==='navigate')return (await shell.match(new URL('index.html',self.registration.scope)))||Response.error();throw err;}})());});
