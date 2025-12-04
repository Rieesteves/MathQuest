const CACHE_NAME = "mathquest-cache-v6";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",

  // images
  "/assets/boy.png",
  "/assets/icon-192.png",

  // sounds
  "/assets/correct.mp3",
  "/assets/wrong.mp3",
  "/assets/timesup.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => (k !== CACHE_NAME && caches.delete(k)))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res =>
      res || fetch(e.request).catch(() => caches.match("/index.html"))
    )
  );
});
