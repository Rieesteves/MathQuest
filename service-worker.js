const CACHE_NAME="mathquest-cache-v5";
const ASSETS=["/","/index.html","/style.css","/script.js","/manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>x!==CACHE_NAME&&caches.delete(x)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match("/index.html"))));});
