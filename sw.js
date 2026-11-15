/* LIKHA Academy offline cache: the app works without Wi-Fi after the first visit. */
var V = "likha-v4";
var CORE = ["./", "index.html", "style.css", "i18n.js", "data.js", "data2.js", "vq.js", "vlessons.js", "app.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  var mine = u.origin === location.origin, font = /cdn\.jsdelivr\.net/.test(u.host), thumb = /i\.ytimg\.com/.test(u.host);
  if (!mine && !font && !thumb) return;
  if (mine) {
    // network first for our files so updates arrive, cache as fallback offline
    e.respondWith(fetch(e.request).then(function (r) { var c = r.clone(); caches.open(V).then(function (ca) { ca.put(e.request, c); }); return r; }).catch(function () { return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); }); }));
  } else {
    e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request).then(function (res) { var c = res.clone(); caches.open(V).then(function (ca) { ca.put(e.request, c); }); return res; }); }));
  }
});
