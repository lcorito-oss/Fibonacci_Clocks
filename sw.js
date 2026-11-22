/* Reloj de Fibonacci — service worker: guarda la página, sus iconos y
   la foto de la Luna para que el reloj abra sin conexión tras la
   primera visita, ya instalado o en el navegador. */
var CACHE = "reloj-fibonacci-v18";
var INDEX = "./index.html";
var PRECACHE = [
  "./",
  "./index.html",
  "./assets/manifest.webmanifest",
  "./assets/browserconfig.xml",
  "./assets/moon-surface.png",
  "./assets/icon-144.png",
  "./assets/icon-192.png",
  "./assets/icon-256.png",
  "./assets/icon-384.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/apple-touch-icon-120.png",
  "./assets/apple-touch-icon-152.png",
  "./assets/apple-touch-icon-167.png",
  "./assets/favicon-16.png",
  "./assets/favicon-32.png",
  "./assets/favicon-48.png",
  "./assets/favicon.ico",
  "./assets/mstile-150.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(event.request).then(function (res) {
        if (res && res.ok && new URL(event.request.url).origin === self.location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
        }
        return res;
      }).catch(function () {
        // Sin conexión y sin copia del recurso: si era una navegación,
        // se sirve la página guardada para que el reloj siga abriendo.
        if (event.request.mode === "navigate") {
          return caches.match(INDEX, { ignoreSearch: true });
        }
        return Response.error();
      });
    })
  );
});
