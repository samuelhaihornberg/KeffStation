const CACHE='kifftech-agent-v6';
const ASSETS=['./','./index.html','./rayons.html','./catalog.html','./app.v2.js','./manifest.json','./img/sp1.jpg','./img/sp2.png','./img/sp4.png','./img/sp6.jpg','./img/sp8.jpg','./img/tb1.jpg','./img/tb3.jpg','./img/tb6.png','./img/tb8.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c))}return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  if(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|ico|json)$/.test(url.pathname)){
    e.respondWith(caches.match(e.request).then(cached=>{
      const net=fetch(e.request).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(ch=>ch.put(e.request,c))}return res}).catch(()=>cached);
      return cached||net;
    }));
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});