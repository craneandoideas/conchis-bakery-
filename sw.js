const CACHE='conchis-aprobada-v1';
const ASSETS=["./", "./index.html", "./app.js", "./manifest.webmanifest", "./assets/portada.jpg", "./assets/logo-corazon.png", "./assets/icon-180.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/qrcode.min.js", "./assets/torta-0.png", "./assets/torta-1.png", "./assets/torta-2.png", "./assets/torta-3.png", "./assets/torta-4.png", "./assets/torta-5.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('conchis-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)));}return r;}).catch(()=>caches.match('./index.html')));return;}
e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok&&r.status===200){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;})));});
