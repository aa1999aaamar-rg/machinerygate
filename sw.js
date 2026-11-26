const V='mgu-v31';const CORE=["./", "./index.html", "./styles.css?v=31", "./app.js?v=31", "./i18n.js?v=2", "./vendor/gsap.min.js", "./vendor/ScrollTrigger.min.js", "./vendor/lenis.min.js", "./fonts/cairo.woff2", "./img/logo-h.svg", "./img/mark.svg", "./img/field-truck.webp", "./icons/icon-192.png", "./icons/icon-512.png", "./manifest.webmanifest", "./offline.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('./',cp));return res}).catch(()=>caches.match('./').then(m=>m||caches.match('./offline.html'))));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok&&res.status===200){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
});
