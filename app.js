/* v32 CMS prelude: visual config from cache, before scenes init */
(()=>{let c=null;try{c=JSON.parse(localStorage.getItem('mgu-cms')||'null')}catch(e){}window.__cmsVisSig=c?JSON.stringify([c.hero_imgs||[],c.gallery_hide||[],c.gallery_add||[]]):'';if(!c)return;const d=document;try{
 if(c.accent)d.documentElement.style.setProperty('--y',c.accent);
 const hb=d.querySelector('.hero-bg');if(hb&&c.hero_imgs&&c.hero_imgs.length){hb.innerHTML='';c.hero_imgs.forEach((u,i)=>{const im=d.createElement('img');im.className='hs'+(i?'':' on');im.src=u;im.alt='';if(i){im.loading='lazy';im.decoding='async'}else{im.fetchPriority='high'}hb.appendChild(im)})}
 const tr=d.querySelector('.fs-track');if(tr){const hide=new Set(c.gallery_hide||[]);if(hide.size)[...tr.querySelectorAll('.gi')].forEach(g=>{if(hide.has(g.dataset.src)||hide.has(new URL(g.dataset.src,location.href).href))g.remove()});
  (c.gallery_add||[]).slice().reverse().forEach(u=>{const b=d.createElement('button');b.className='gi';b.type='button';b.dataset.src=u;const im=d.createElement('img');im.src=u;im.alt='من الميدان - بوابة الآليات المتحدة';im.loading='lazy';im.decoding='async';b.appendChild(im);tr.prepend(b)})}
}catch(e){console.warn('cms-pre',e)}})();

(()=>{
const d=document,root=d.documentElement;root.classList.add('js');
const RM=false;
const WA_NUM='966551005418';
const $=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const hasG=()=>!!(window.gsap&&window.ScrollTrigger);
const isDesktopPointer=()=>matchMedia('(hover:hover) and (pointer:fine)').matches&&innerWidth>=1024;
const yrEl=$('#yr');if(yrEl)yrEl.textContent=new Date().getFullYear();

/* ---------- Reveal (cheap IO, GPU transform/opacity only) ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=((i%4)*55)+'ms';io.observe(el)});
$$('.card,.gi,.rimg,.sec-title').forEach(el=>io.observe(el));

/* ---------- Fast Brand-Aligned Preloader (700ms min, 1.8s hard cap) ---------- */
const loader=$('#loader'),ldp=$('#ldp'),ldbar=$('#ldbar');
let lenis=null,loaderDone=false;
function endLoader(){
  if(loaderDone)return;loaderDone=true;
  d.body.classList.remove('is-loading');
  if(ldp)ldp.textContent='100';
  if(ldbar)ldbar.style.width='100%';
  if(!loader){heroIntro();return}
  loader.classList.add('ld-out');
  heroIntro();
  setTimeout(()=>{if(loader.parentNode)loader.remove()},420);
}
function runLoader(){
  if(!loader){d.body.classList.remove('is-loading');heroIntro();return}
  const start=performance.now(),MIN=700,HARD_MAX=1800;
  let p=0,ready=false;
  const heroImg=$('#hero .hero-bg .hs.on');
  const imgReady=()=>!heroImg||heroImg.complete;
  const fontsReady=d.fonts?d.fonts.ready.catch(()=>{}):Promise.resolve();
  Promise.all([
    fontsReady,
    imgReady()?Promise.resolve():new Promise(res=>{heroImg.addEventListener('load',res,{once:true});heroImg.addEventListener('error',res,{once:true})})
  ]).then(()=>{ready=true});
  addEventListener('load',()=>{ready=true},{once:true});
  setTimeout(endLoader,HARD_MAX);
  (function tick(now){
    if(loaderDone)return;
    const elapsed=now-start;
    const target=ready?100:Math.min(86,(elapsed/MIN)*86);
    p+=(target-p)*.22;
    if(ready&&elapsed>=MIN&&p>97.5)p=100;
    if(ldp)ldp.textContent=String(Math.round(p));
    if(ldbar)ldbar.style.width=p.toFixed(1)+'%';
    if((p>=99.5&&elapsed>=MIN)||elapsed>=HARD_MAX){endLoader();return}
    requestAnimationFrame(tick);
  })(start);
}

/* ---------- Hero intro (GPU-only, crisp) ---------- */
let heroDone=false;
function heroIntro(){
  if(heroDone)return;heroDone=true;
  if(RM||!hasG())return;
  const tl=gsap.timeline({defaults:{ease:'expo.out'}});
  tl.from('#hero .kicker',{y:14,opacity:0,duration:.55})
    .from('#hero .hero-title .ln>span',{yPercent:105,duration:.85,stagger:.09},'<.06')
    .from('#hero .hero-tag,#hero .hero-rot',{y:16,opacity:0,duration:.65,stagger:.07},'<.14')
    .from('#hero .hero-cta .btn',{y:16,opacity:0,duration:.55,stagger:.06},'<.12')
    .from('#hero .stat',{y:18,opacity:0,duration:.55,stagger:.07},'<.1');
}

/* ---------- Header, Progress Bar, Back-to-top & Rail (scroll-driven, zero idle loop) ---------- */
const hdr=$('header'),prog=$('#prog'),tt=$('.totop'),prCircle=$('.tt-pr');
const railFill=$('.rail-fill'),railTruck=$('.rail-truck'),railEl=$('#rail');
let railH=railEl?railEl.offsetHeight:0;
let lastY=scrollY,scrollRaf=0;

function updateScrollUI(){
  scrollRaf=0;
  const y=window.scrollY||0;
  if(hdr){
    hdr.classList.toggle('solid',y>24);
    const navOpen=$('#nav')?.classList.contains('open');
    if(y>lastY+6&&y>480&&!navOpen)hdr.classList.add('hide');
    else if(y<lastY-4||y<=120)hdr.classList.remove('hide');
  }
  d.body.classList.toggle('scrolled',y>Math.min(260,innerHeight*.35));
  lastY=y;
  const max=d.documentElement.scrollHeight-innerHeight;
  const p=max>0?Math.min(1,Math.max(0,y/max)):0;
  if(prog)prog.style.transform=`scaleX(${p})`;
  if(tt){
    tt.classList.toggle('show',y>innerHeight*.65);
    if(prCircle)prCircle.style.strokeDashoffset=(100.5*(1-p)).toFixed(2);
  }
  if(railFill&&railTruck&&railH>0){
    railFill.style.transform=`scaleY(${p})`;
    railTruck.style.transform=`translateY(${(p*(railH-30)-10).toFixed(1)}px)`;
  }
}
function queueScrollUI(){if(!scrollRaf)scrollRaf=requestAnimationFrame(updateScrollUI)}
addEventListener('resize',()=>{railH=railEl?railEl.offsetHeight:0;queueScrollUI()},{passive:true});

tt&&tt.addEventListener('click',()=>{
  if(window.__lenis)window.__lenis.scrollTo(0,{duration:1.1});
  else window.scrollTo({top:0,behavior:'smooth'});
});

/* ---------- Mobile Drawer Menu ---------- */
const burger=$('.burger'),nav=$('#nav');
function setNavOpen(open){
  if(!nav||!burger)return;
  nav.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',String(open));
  d.body.style.overflow=open?'hidden':'';d.body.classList.toggle('nav-open',open);
  if(open&&hdr)hdr.classList.remove('hide');
}
burger&&burger.addEventListener('click',()=>setNavOpen(!nav.classList.contains('open')));
addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open'))setNavOpen(false)});
// Mobile drawer tool proxies (Theme / Customize)
$$('[data-proxy]').forEach(btn=>btn.addEventListener('click',()=>{
  const target=$(btn.dataset.proxy);
  setNavOpen(false);
  if(target)setTimeout(()=>target.click(),60);
}));

/* ---------- Smooth Instant Anchor Navigation (no blocking 1.6s sweep) ---------- */
function goTo(hash){
  if(!hash||hash[0]!=='#')return;
  const t=$(hash);if(!t)return;
  setNavOpen(false);
  const offset=hash==='#hero'?0:-(hdr?hdr.offsetHeight+8:64);
  if(lenis){
    lenis.scrollTo(t,{duration:.9,offset});
  }else{
    const top=Math.max(0,t.getBoundingClientRect().top+window.scrollY+offset);
    window.scrollTo({top,behavior:'smooth'});
  }
}
$$('[data-go]').forEach(a=>a.addEventListener('click',e=>{
  const h=a.getAttribute('href');
  if(h&&h.startsWith('#')){e.preventDefault();goTo(h)}
}));

/* ---------- GSAP Scenes (Lenis ONLY on desktop fine-pointer; native momentum on touch/mobile!) ---------- */
function scenes(){
  gsap.registerPlugin(ScrollTrigger);
  if(!RM&&isDesktopPointer()&&typeof Lenis==='function'){
    lenis=new Lenis({duration:.55,smoothWheel:true,wheelMultiplier:1.45,smoothTouch:false});
    window.__lenis=lenis;
    lenis.on('scroll',()=>{ScrollTrigger.update();queueScrollUI()});
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  }else{
    // Pure native momentum scroll on mobile/touch devices
    addEventListener('scroll',queueScrollUI,{passive:true});
  }
  if(RM)return;

  // Hazard stripe dividers
  $$('.hz').forEach(el=>{
    gsap.fromTo(el,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 60%',scrub:.4}});
  });

  // Clean GPU-only reveal on section titles (NO Arabic letterSpacing animation!)
  $$('.sec-title').forEach(h=>{
    gsap.from(h,{y:24,opacity:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:h,start:'top 88%',once:true}});
  });

  // Subtle parallax on images (desktop only for ultra-smooth mobile touch scroll)
  if(isDesktopPointer()){
    $$('.plx').forEach(img=>gsap.fromTo(img,{yPercent:-6},{yPercent:5,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
  }

  // Fleet cards clean GPU reveal (single animation, no competing transforms)
  gsap.utils.toArray('.fleet-card').forEach((c,i)=>gsap.from(c,{y:36,opacity:0,duration:.75,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:c,start:'top 88%',once:true}}));

  // CTA truck entrance
  if($('.cta-truck'))gsap.from('.cta-truck',{x:-120,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:'#cta',start:'top 80%',once:true}});

  // Footer mega mark
  if($('.mega'))gsap.fromTo('.mega',{yPercent:30,opacity:.35},{yPercent:0,opacity:1,ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:true}});

  // Active nav highlight
  $$('[data-station]').forEach(s=>ScrollTrigger.create({
    trigger:s,start:'top 45%',end:'bottom 45%',
    onToggle:st=>{if(st.isActive){$$('#nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+s.id))}}
  }));
  addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
}

/* ---------- PWA install ---------- */
const ib=$('.btn-install'),hint=$('#ios-hint');let deferred=null;
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
if(ib&&!standalone){
  if(isIOS)ib.hidden=false;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;ib.hidden=false});
}
addEventListener('appinstalled',()=>{if(ib)ib.hidden=true;deferred=null});
ib&&ib.addEventListener('click',async()=>{
  if(deferred){deferred.prompt();await deferred.userChoice.catch(()=>{});deferred=null;ib.hidden=true}
  else if(hint)hint.hidden=false;
});
hint&&hint.addEventListener('click',e=>{if(e.target===hint||e.target.closest('.ih-x'))hint.hidden=true});
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

/* ---------- Quote Section: Quick-Tap Cargo Chips + Instant WhatsApp + Direct Website Submit ---------- */
const qform=$('#qform');
if(qform){
  const qType=$('#q-type',qform),err=$('.form-err',qform),okBox=$('.form-ok',qform);
  const chips=$$('.q-chip',qform);
  chips.forEach(ch=>ch.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.toggle('on',c===ch));
    if(qType)qType.value=ch.dataset.cargo||ch.textContent.trim();
  }));

  // Optional fields toggle
  const optBtn=$('.q-opt-toggle',qform),optBox=$('.q-opt',qform);
  if(optBtn&&optBox){
    optBtn.addEventListener('click',()=>{
      const open=optBox.hidden;
      optBox.hidden=!open;
      optBtn.setAttribute('aria-expanded',String(open));
      const sp=$('span',optBtn);
      if(sp)sp.textContent=open?(window.T?T('− إخفاء الحقول الإضافية'):'− إخفاء الحقول الإضافية'):(window.T?T('+ إضافة تاريخ أو ملاحظات (اختياري)'):'+ إضافة تاريخ أو ملاحظات (اختياري)');
    });
  }

  const gv=n=>(qform.elements[n]?.value||'').trim();
  function buildWaMessage(){
    const lines=['السلام عليكم، أرغب في عرض سعر لخدمة نقل من بوابة الآليات المتحدة:'];
    if(gv('type'))lines.push('نوع الحمولة: '+gv('type'));
    if(gv('from')||gv('to'))lines.push('المسار: من '+(gv('from')||'—')+' إلى '+(gv('to')||'—'));
    if(gv('name'))lines.push('الاسم: '+gv('name'));
    if(gv('phone'))lines.push('الجوال: '+gv('phone'));
    if(gv('date'))lines.push('التاريخ المفضل: '+gv('date'));
    if(gv('notes'))lines.push('ملاحظات: '+gv('notes'));
    return lines.join('\n');
  }

  // Instant Pre-filled WhatsApp Quote button (zero friction: works even with just chip + route!)
  const waBtn=$('.q-wa-btn',qform);
  waBtn&&waBtn.addEventListener('click',()=>{
    const url='https://wa.me/'+(window.__waNum||WA_NUM)+'?text='+encodeURIComponent(buildWaMessage());
    if(window.__track)window.__track('wa',{sec:'quote'});
    // Also store lead if name & phone were filled
    const c=(window.__cmsCfg&&window.__cmsCfg())||{};
    if(c.quote_store!==false&&gv('name')&&gv('phone')){
      const API=(window.__CMS_URL||'https://mgu-admin.sites.tab.bot')+'/api/';
      fetch(API+'quote',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(qform).entries())),keepalive:true,headers:{'content-type':'text/plain'}}).catch(()=>{});
    }
    window.open(url,'_blank','noopener');
  });

  // Direct Website Quote Submission (POST -> /api/quote + clean confirmation)
  qform.addEventListener('submit',async e=>{
    e.preventDefault();
    let valid=true;
    $$('[required]',qform).forEach(i=>{
      const bad=!i.value.trim();
      i.classList.toggle('bad',bad);
      if(bad)valid=false;
    });
    if(err)err.hidden=valid;
    if(!valid){if(okBox)okBox.hidden=true;return}
    const subBtn=$('.q-sub-btn',qform);
    if(subBtn)subBtn.disabled=true;
    const payload=Object.fromEntries(new FormData(qform).entries());
    const c=(window.__cmsCfg&&window.__cmsCfg())||{};
    const API=(window.__CMS_URL||'https://mgu-admin.sites.tab.bot')+'/api/';
    try{
      if(c.quote_store!==false){
        await fetch(API+'quote',{method:'POST',body:JSON.stringify(payload),keepalive:true,headers:{'content-type':'text/plain'}}).catch(()=>{});
      }
      if(window.__track)window.__track('quote',{sec:'quote'});
      if(okBox)okBox.hidden=false;
    }finally{
      if(subBtn)subBtn.disabled=false;
    }
  });
}

/* ---------- Share ---------- */
const shareBtn=$('.share');
shareBtn&&shareBtn.addEventListener('click',async()=>{
  const data={title:'بوابة الآليات المتحدة',text:'بوابة الآليات المتحدة المحدودة - قسم النقليات: نقود أعمالك بثقة… حلول نقل ثقيل باحتراف',url:location.origin+'/'};
  if(navigator.share){try{await navigator.share(data)}catch(e){}}
  else{try{await navigator.clipboard.writeText(data.url);shareBtn.lastChild.textContent=' تم نسخ الرابط'}catch(e){}}
});

/* ---------- CEO message ---------- */
const moreBtn=$('.more');
moreBtn&&moreBtn.addEventListener('click',e=>{
  const q=$('#ceo blockquote'),o=!q.classList.contains('open');
  q.classList.toggle('open',o);
  e.target.textContent=o?(window.T?T('إخفاء'):'إخفاء'):(window.T?T('اقرأ الكلمة كاملة'):'اقرأ الكلمة كاملة');
  e.target.setAttribute('aria-expanded',String(o));
  if(hasG())setTimeout(()=>ScrollTrigger.refresh(),450);
});

/* ---------- Lightbox ---------- */
const lb=$('#lb'),lbi=$('#lb img');
const gis=$$('.gi'),lbc=$('.lb-c');let li=0;
function show(k){
  if(!gis.length)return;
  li=(k+gis.length)%gis.length;
  const g=gis[li];
  lbi.classList.remove('in');
  lbi.src=g.dataset.src;
  lbi.alt=$('img',g)?.alt||'';
  lbi.onload=()=>lbi.classList.add('in');
  if(lbc)lbc.textContent=(li+1)+' / '+gis.length;
}
function closeLb(){if(!lb)return;lb.hidden=true;d.body.style.overflow='';if(lenis)lenis.start()}
gis.forEach((g,k)=>g.addEventListener('click',()=>{if(!lb)return;show(k);lb.hidden=false;d.body.style.overflow='hidden';if(lenis)lenis.stop()}));
lb&&lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-x'))closeLb()});
$('.lb-prev')?.addEventListener('click',e=>{e.stopPropagation();show(li+1)});
$('.lb-next')?.addEventListener('click',e=>{e.stopPropagation();show(li-1)});
addEventListener('keydown',e=>{if(!lb||lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(li+1);if(e.key==='ArrowRight')show(li-1)});
let sx=null;
lb&&lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
lb&&lb.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)show(li+(dx>0?-1:1));sx=null});

/* ---------- Tap ripple (lightweight) ---------- */
d.addEventListener('pointerdown',e=>{
  const b=e.target.closest('.btn,.mini,.fab a,.tbtn,.q-chip');if(!b||RM)return;
  const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=d.createElement('span');
  sp.className='rip';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
  b.appendChild(sp);setTimeout(()=>sp.remove(),550);
});

/* ---------- Boot ---------- */
function boot(){
  if(hasG()){try{scenes()}catch(e){console.error(e);addEventListener('scroll',queueScrollUI,{passive:true})}}
  else addEventListener('scroll',queueScrollUI,{passive:true});
  runLoader();
  updateScrollUI();
}
if(d.readyState!=='loading')boot();else d.addEventListener('DOMContentLoaded',boot);
})();

/* ===== Roadwipes (scroll-driven, zero polling interval) ===== */
(()=>{
const ws=[...document.querySelectorAll('.roadwipe')];if(!ws.length)return;let raf=0;
function upd(){
  raf=0;const vh=innerHeight,vw=innerWidth;
  ws.forEach(w=>{
    const r=w.getBoundingClientRect();if(r.bottom<-60||r.top>vh+60)return;
    const p=Math.min(1,Math.max(0,(vh-r.top)/(vh+r.height)));
    const t=w.querySelector('.rw-truck');if(!t)return;
    const tw=t.offsetWidth;
    const x=(vw+10)-p*(vw+tw+20);
    t.style.transform=`translate3d(${x.toFixed(1)}px,0,0)`;
  });
}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
addEventListener('scroll',q,{passive:true});addEventListener('resize',q,{passive:true});addEventListener('load',q,{once:true});
q();
})();

/* ===== Lowbed Services (real Renault cab + yellow lowbed, slower smooth motion) + Mobile Film Strip ===== */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const pin=$('.lb-pin'),rig=$('.lb-rig'),cards=$$('.lb-card'),dots=$$('.lb-dots i'),cnt=$('.lb-count b');
const fpin=$('.fs-pin'),ftrack=$('.fs-track'),frames=ftrack?[...ftrack.children]:[];
let cur=-1,raf=0;

function sizeFS(){
  if(!fpin||!ftrack)return;
  if(innerWidth>=1024){fpin.style.height='';fpin.dataset.dist='0';return}
  const dist=Math.max(0,ftrack.scrollWidth-innerWidth);
  fpin.style.height=(dist+innerHeight)+'px';
  fpin.dataset.dist=String(dist);
}
function upd(){
  raf=0;const vh=innerHeight,vw=innerWidth;
  if(pin&&rig&&cards.length){
    const r=pin.getBoundingClientRect(),tot=Math.max(1,pin.offsetHeight-vh);
    const p=Math.min(1,Math.max(0,-r.top/tot));
    const n=cards.length,seg=Math.min(n-1e-4,p*n),i=Math.floor(seg),t=seg-i;
    const rw=rig.offsetWidth,off=vw/2+rw/2+40;let x;
    if(t<.30)x=off*(1-ease(t/.30));
    else if(t<.70)x=0;
    else x=-off*ease((t-.70)/.30);
    rig.style.transform=`translate3d(${(x-rw/2).toFixed(1)}px,0,0)`;
    if(i!==cur){
      cur=i;
      cards.forEach((c,k)=>c.classList.toggle('on',k===i));
      dots.forEach((c,k)=>c.classList.toggle('on',k===i));
      if(cnt)cnt.textContent=String(i+1).padStart(2,'0');
    }
    window.__rigQ&&window.__rigQ();
  }
  if(fpin&&ftrack&&innerWidth<1024){
    const r=fpin.getBoundingClientRect(),dist=+fpin.dataset.dist||0,tot=Math.max(1,fpin.offsetHeight-vh);
    if(r.bottom>-80&&r.top<vh+80){
      const p=Math.min(1,Math.max(0,-r.top/tot));
      const rtl=getComputedStyle(ftrack).direction==='rtl';
      ftrack.style.transform=`translate3d(${((rtl?1:-1)*p*dist).toFixed(1)}px,0,0)`;
    }
  }
}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
addEventListener('scroll',q,{passive:true});
addEventListener('resize',()=>{sizeFS();q()},{passive:true});
addEventListener('load',()=>{sizeFS();q();window.ScrollTrigger&&ScrollTrigger.refresh()},{once:true});
sizeFS();q();
$$('.fs-track img').forEach(im=>im.complete||im.addEventListener('load',()=>{sizeFS();q()},{once:true}));
})();

/* ===== True rolling wheels + moving road stripes (only in-view rigs, scroll-driven) ===== */
(()=>{
const rigs=[...document.querySelectorAll('.rig')],roads=[...document.querySelectorAll('.rw-road,.lb-road')];
if(!rigs.length)return;
const vis=new Set(),rv=new Set();
const io=new IntersectionObserver(es=>es.forEach(e=>{
  const s=e.target.classList.contains('rig')?vis:rv;
  e.isIntersecting?s.add(e.target):s.delete(e.target);
}),{rootMargin:'120px'});
rigs.forEach(r=>{io.observe(r);r._w=[...r.querySelectorAll('.wh img')];r._last=null});
roads.forEach(e=>io.observe(e));
let raf=0;
function upd(){
  raf=0;const D=scrollY*0.9;
  rv.forEach(e=>{const p=D.toFixed(1)+'px 0';e.style.backgroundPosition=p;const i=e.firstElementChild;if(i)i.style.backgroundPosition=p});
  vis.forEach(r=>{
    const onRoad=!!r.closest('.roadwipe,.lb-scene');
    const x=r.getBoundingClientRect().left-(onRoad?D:0);
    if(r._last===null){r._last=x;return}
    const dx=x-r._last;r._last=x;if(Math.abs(dx)<0.05)return;
    r._w.forEach(img=>{
      const rad=(img.offsetWidth/2)||20;
      img._a=(img._a||0)+dx/rad*57.2958;
      img.style.transform='rotate('+img._a.toFixed(1)+'deg)';
    });
  });
}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
window.__rigQ=q;
addEventListener('scroll',q,{passive:true});addEventListener('resize',q,{passive:true});
q();
})();

/* ===== Hero rig, rotating specialty words, skip buttons, gallery HUD ===== */
(()=>{
const d=document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
const hr=$('.hero-road .hero-rig');
if(hr){
  let intro=0,t0=0;
  const target=()=>{const w=hr.offsetWidth,W=hr.parentNode.offsetWidth;return innerWidth>=1024?W*.08:(W-w)/2};
  function place(){
    const p=target();let x;
    if(intro<1){const e=1-Math.pow(1-intro,3);x=innerWidth+40+(p-innerWidth-40)*e}else x=p;
    x-=Math.max(0,scrollY)*1.15;
    hr.style.transform='translate3d('+x.toFixed(1)+'px,0,0)';
    window.__rigQ&&window.__rigQ();
  }
  function run(n){if(!t0)t0=n;intro=Math.min(1,(n-t0)/1300);place();if(intro<1)requestAnimationFrame(run)}
  hr.style.transform='translate3d('+(innerWidth+40)+'px,0,0)';
  const wait=()=>{if(d.getElementById('loader'))return setTimeout(wait,120);requestAnimationFrame(run)};
  setTimeout(wait,150);
  addEventListener('scroll',()=>{if(intro>=1)requestAnimationFrame(place)},{passive:true});
  addEventListener('resize',place,{passive:true});
}

const rot=$('.rot');
if(rot){
  let W=rot.dataset.words.split('|'),k=0;
  setInterval(()=>{
    if(document.hidden||scrollY>innerHeight)return;
    W=rot.dataset.words.split('|');
    rot.classList.add('out');
    setTimeout(()=>{k=(k+1)%W.length;rot.textContent=window.T?T(W[k]):W[k];rot.classList.remove('out')},280);
  },2400);
}

$$('.skip-btn').forEach(b=>b.addEventListener('click',()=>{
  const el=$(b.dataset.skip);if(!el)return;
  const y=el.getBoundingClientRect().top+scrollY+el.offsetHeight-40;
  if(window.__lenis)window.__lenis.scrollTo(y,{duration:1});
  else scrollTo({top:y,behavior:'smooth'});
}));

const fp=$('.fs-pin'),fr=fp?[...fp.querySelectorAll('.fs-track>*')]:[],fn=$('.fs-n b'),ft=$('.fs-n em');
if(ft)ft.textContent=String(fr.length).padStart(2,'0');
let fr0=-1,raf=0;
function fsu(){
  raf=0;if(!fp||innerWidth>=1024)return;
  const r=fp.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const c=innerWidth/2;let best=0,bd=1e9;
  fr.forEach((f,i)=>{const b=f.getBoundingClientRect(),dd=Math.abs(b.left+b.width/2-c);if(dd<bd){bd=dd;best=i}});
  if(best!==fr0){fr0=best;fr.forEach((f,i)=>f.classList.toggle('cur',i===best));if(fn)fn.textContent=String(best+1).padStart(2,'0')}
}
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(fsu)},{passive:true});fsu();
})();

/* ===== Desktop interactive side rail (strictly >=1024px) ===== */
(()=>{
const d=document,rail=d.getElementById('rail');if(!rail)return;
const secs=[...d.querySelectorAll('[data-station]')];
const names={hero:'الرئيسية',about:'من نحن',services:'خدماتنا',fleet:'الأسطول',field:'المعرض',clients:'عملاؤنا',contact:'تواصل'};
const tip=d.createElement('i');tip.className='rail-tip';rail.appendChild(tip);
const T=s=>window.T?window.T(s):s;
const sts=secs.map(s=>{
  const b=d.createElement('button');b.type='button';b.className='rail-st';
  b.innerHTML='<span>'+T(names[s.id]||s.id)+'</span>';
  b.setAttribute('aria-label',T(names[s.id]||s.id));
  rail.appendChild(b);
  b.addEventListener('click',e=>{e.stopPropagation();go(s.getBoundingClientRect().top+scrollY-10,true)});
  return b;
});
const max=()=>Math.max(1,d.documentElement.scrollHeight-innerHeight);
function layout(){if(innerWidth<1024)return;const M=max();secs.forEach((s,i)=>{const y=s.getBoundingClientRect().top+scrollY;sts[i].style.top=(Math.min(1,y/M)*100)+'%'})}
function go(y,smooth){y=Math.max(0,Math.min(max(),y));if(window.__lenis)window.__lenis.scrollTo(y,smooth?{duration:.9}:{immediate:true});else scrollTo({top:y,behavior:smooth?'smooth':'auto'})}
function cur(){
  if(innerWidth<1024)return;
  const y=scrollY+innerHeight*.4;let k=0;
  secs.forEach((s,i)=>{if(s.getBoundingClientRect().top+scrollY<=y)k=i});
  sts.forEach((b,i)=>b.classList.toggle('on',i===k));
  const p=Math.min(1,scrollY/max());
  rail.setAttribute('aria-valuenow',String(Math.round(p*100)));
  tip.style.top=(p*100)+'%';tip.textContent=T(names[secs[k].id]||'');
}
let dragging=false;
function yFrom(e){const r=rail.getBoundingClientRect();return Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))}
rail.addEventListener('pointerdown',e=>{if(e.target.closest('.rail-st'))return;dragging=true;rail.classList.add('drag');rail.setPointerCapture(e.pointerId);go(yFrom(e)*max(),!e.target.closest('.rail-truck'));e.preventDefault()});
rail.addEventListener('pointermove',e=>{if(!dragging)return;go(yFrom(e)*max(),false)});
const end=()=>{dragging=false;rail.classList.remove('drag')};
rail.addEventListener('pointerup',end);rail.addEventListener('pointercancel',end);
rail.addEventListener('keydown',e=>{const s=innerHeight*.8;if(e.key==='ArrowDown'||e.key==='PageDown'){go(scrollY+s,true);e.preventDefault()}if(e.key==='ArrowUp'||e.key==='PageUp'){go(scrollY-s,true);e.preventDefault()}if(e.key==='Home')go(0,true);if(e.key==='End')go(max(),true)});
addEventListener('scroll',cur,{passive:true});addEventListener('resize',()=>{layout();cur()},{passive:true});addEventListener('load',()=>{layout();cur()},{once:true});
layout();cur();
})();

/* ===== Desktop gallery expand toggle ===== */
(()=>{const b=document.querySelector('.fs-more'),t=document.querySelector('.fs-track');if(!b||!t)return;b.addEventListener('click',()=>{const a=t.classList.toggle('all');b.textContent=a?(window.T?T('عرض أقل'):'عرض أقل'):(window.T?T('عرض كل الصور'):'عرض كل الصور')})})();

/* ===== Hero slideshow ===== */
(()=>{const s=[...document.querySelectorAll('.hero-bg .hs')];if(s.length<2)return;let k=0;
setInterval(()=>{if(document.hidden||scrollY>innerHeight)return;s[k].classList.remove('on');k=(k+1)%s.length;s[k].classList.add('on')},5200)})();

/* ===== Customization panel ===== */
(()=>{const d=document,root=d.documentElement,K='mgu-prefs',btn=d.querySelector('.cust-btn'),pn=d.querySelector('.cust');if(!btn||!pn)return;
const def={fs:'1',speed:'normal',motion:'on',accent:'',rail:'on'};let P={};try{P=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}P={...def,...P};
const sp={slow:{duration:1.0,wheelMultiplier:.9},normal:{duration:.55,wheelMultiplier:1.45},fast:{duration:.35,wheelMultiplier:2.2}};
function applyP(){
  root.style.setProperty('--fs',P.fs);
  {let ca='';try{ca=(JSON.parse(localStorage.getItem('mgu-cms')||'{}')||{}).accent||''}catch(e){}const ac=P.accent||ca;if(ac)root.style.setProperty('--y',ac);else root.style.removeProperty('--y')}
  root.classList.toggle('calm',P.motion==='off');
  root.classList.toggle('no-rail',P.rail==='off');
  const l=window.__lenis;if(l&&l.options)Object.assign(l.options,sp[P.speed]||sp.normal);
  sync();
}
function cur(k){if(k==='theme')return root.dataset.theme==='light'?'light':'dark';if(k==='lang'){try{return localStorage.getItem('mgu-lang')||'ar'}catch(e){return 'ar'}}return P[k]}
function sync(){pn.querySelectorAll('.seg').forEach(s=>{const v=cur(s.dataset.k);s.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===v))})}
pn.querySelectorAll('.seg').forEach(s=>s.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const k=s.dataset.k,v=b.dataset.v;
 if(k==='theme'){if(cur('theme')!==v)d.querySelector('.theme-btn')?.click();setTimeout(sync,50);return}
 if(k==='lang'){d.querySelector('.lang-menu [data-lang="'+v+'"]')?.click();setTimeout(sync,80);return}
 P[k]=v;try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}applyP()}));
pn.querySelector('.cust-reset').addEventListener('click',()=>{P={...def};try{localStorage.removeItem(K)}catch(e){}applyP()});
btn.addEventListener('click',()=>{pn.hidden=!pn.hidden;sync()});
pn.querySelector('.cust-x').addEventListener('click',()=>pn.hidden=true);
d.addEventListener('click',e=>{if(e.isTrusted&&!pn.hidden&&!pn.contains(e.target)&&!btn.contains(e.target)&&!e.target.closest('[data-proxy]'))pn.hidden=true});
applyP();
})();

/* ===== Glowing side lamps on Renault lowbed rigs ===== */
(()=>{const P=[[45.89,74.37],[50.89,74.37],[55.88,74.37],[60.88,74.37],[90.87,74.37],[95.87,74.37],[64.52,73.99],[71.10,73.99],[79.96,73.99],[86.55,73.99],[23.63,62.04],[29.08,62.04],[34.53,62.04],[39.98,62.04]];document.querySelectorAll('.rig').forEach(r=>{P.forEach((p,i)=>{const s=document.createElement('b');s.className='lamp';s.style.left=p[0]+'%';s.style.top=p[1]+'%';s.style.animationDelay=(i*.12)+'s';r.appendChild(s)})})})();

/* ===== CMS: content from mgu-admin ===== */
(()=>{const URL_=(window.__CMS_URL||'https://mgu-admin.sites.tab.bot')+'/api/config',d=document,K='mgu-cms';
const D={p1:'0551005418',p2:'0536736218',e1:'bawaabatalaliaat@gmail.com',e2:'y33asr@gmail.com'};
const fmt=n=>n.replace(/\D/g,'').replace(/^(\d{3})(\d{3})(\d{4})$/,'$1 $2 $3');
const intl=n=>{n=n.replace(/\D/g,'');return n.startsWith('0')?'966'+n.slice(1):n};
function swapText(root,from,to){if(!from||!to||from===to)return;const w=d.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())if(n.nodeValue.includes(from))n.nodeValue=n.nodeValue.split(from).join(to)}
function apply(c){if(!c)return;try{
 const P1=(c.phone1||'').replace(/\D/g,'')||D.p1,P2=(c.phone2||'').replace(/\D/g,'')||D.p2,E1=c.email1||D.e1,E2=c.email2||D.e2;
 d.querySelectorAll('a[href]').forEach(a=>{let h=a.getAttribute('href'),o=h;
  h=h.replace('tel:'+D.p1,'tel:'+P1).replace('tel:'+D.p2,'tel:'+P2).replace('wa.me/'+intl(D.p1),'wa.me/'+intl(P1)).replace('wa.me/'+intl(D.p2),'wa.me/'+intl(P2)).replace('mailto:'+D.e1,'mailto:'+E1).replace('mailto:'+D.e2,'mailto:'+E2);if(h!==o)a.setAttribute('href',h)});
 [[fmt(D.p1),fmt(P1)],[D.p1,P1],[fmt(D.p2),fmt(P2)],[D.p2,P2],[D.e1,E1],[D.e2,E2]].forEach(([a,b])=>swapText(d.body,a,b));
 D.p1=P1;D.p2=P2;D.e1=E1;D.e2=E2;window.__waNum=intl(P1);
 if((d.documentElement.lang||'ar').startsWith('ar')){
  const T=(s,v)=>{const e=d.querySelector(s);if(e&&v)e.textContent=v};
  T('.hero-tag',c.hero_tag);T('.hero-sub',c.hero_sub);
  const rot=d.querySelector('.rot');if(rot&&c.hero_words){const w=c.hero_words.split(/\n+/).map(s=>s.trim()).filter(Boolean);if(w.length){rot.dataset.words=w.join('|')}}
  T('#about .lead',c.about_lead);const ap=d.querySelectorAll('#about .about-copy > p.rv');if(ap[1]&&c.about_p)ap[1].textContent=c.about_p;
  T('#ceo figcaption b',c.ceo_name);T('#ceo figcaption span',c.ceo_title);
  const bq=d.querySelector('#ceo blockquote');if(bq&&c.ceo_text){const ps=c.ceo_text.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);bq.querySelectorAll('p').forEach(p=>p.remove());ps.forEach(t=>{const p=d.createElement('p');p.textContent=t;bq.appendChild(p)})}
  if(Array.isArray(c.services))d.querySelectorAll('.lb-card').forEach(el=>{const s=c.services[+el.dataset.i];if(!s)return;const h=el.querySelector('h3'),p=el.querySelector('.svc-body p');if(h&&s.t)h.textContent=s.t;if(p&&s.d)p.textContent=s.d});
 }
 if(c.titles)Object.keys(c.titles).forEach(id=>{const h=d.querySelector('#'+id+' .sec-title');if(!h)return;const t=c.titles[id],sm=h.querySelector('small');if(t.s&&sm)sm.textContent=t.s;if(t.t){[...h.childNodes].forEach(n=>{if(n!==sm)n.remove()});h.appendChild(d.createTextNode(t.t))}});
 ['strengths','about','ceo','services','fleet','values','field','clients','cta','quote','contact'].forEach(id=>{const s=d.getElementById(id);if(s)s.style.display=(c.hide||[]).includes(id)?'none':''});
 let an=d.getElementById('cms-ann');
 if(c.announce_on&&c.announce_text){if(!an){an=d.createElement('div');an.id='cms-ann';d.body.prepend(an)}an.innerHTML='';const inner=d.createElement(c.announce_link?'a':'span');if(c.announce_link){inner.href=c.announce_link;inner.target='_blank';inner.rel='noopener'}inner.textContent=c.announce_text;const x=d.createElement('button');x.type='button';x.ariaLabel='إغلاق';x.textContent='×';x.onclick=()=>{an.remove();d.documentElement.classList.remove('has-ann');sessionStorage.setItem('ann-x',c.announce_text)};an.append(inner,x);
  if(sessionStorage.getItem('ann-x')===c.announce_text){an.remove()}else d.documentElement.classList.add('has-ann')}
 else if(an){an.remove();d.documentElement.classList.remove('has-ann')}
}catch(e){console.warn('cms',e)}}
window.__cmsApply=apply;window.__cmsCfg=()=>cur;let cur=null;
let cached=null;try{cached=JSON.parse(localStorage.getItem(K)||'null')}catch(e){}
if(cached)apply(cached);
const ctl=new AbortController();setTimeout(()=>ctl.abort(),6000);
fetch(URL_,{signal:ctl.signal,cache:'no-store'}).then(r=>r.ok?r.json():null).then(c=>{if(!c)return;cur=c;try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}
 if(c.accent)d.documentElement.style.setProperty('--y',c.accent);else if(!localStorage.getItem('mgu-prefs')||!JSON.parse(localStorage.getItem('mgu-prefs')).accent)d.documentElement.style.removeProperty('--y');
 const sig=JSON.stringify([c.hero_imgs||[],c.gallery_hide||[],c.gallery_add||[]]);
 if(sig!==(window.__cmsVisSig||JSON.stringify([[],[],[]]))&&scrollY<innerHeight*.5&&performance.now()<9000&&sessionStorage.getItem('cms-rl')!==sig){sessionStorage.setItem('cms-rl',sig);location.reload();return}
 apply(c)}).catch(()=>{});
if(cached)cur=cached;
})();

/* ===== Analytics (mgu-admin) ===== */
(()=>{const API=(window.__CMS_URL||'https://mgu-admin.sites.tab.bot')+'/api/',d=document;let vid;try{vid=localStorage.getItem('mgu-vid');if(!vid){vid=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('mgu-vid',vid)}}catch(e){vid='x'+Math.random()}
const dev=/iPad|Tablet/i.test(navigator.userAgent)||(/Android/i.test(navigator.userAgent)&&!/Mobile/i.test(navigator.userAgent))?'tablet':(/Mobi|iPhone|Android/i.test(navigator.userAgent)?'mobile':'desktop');
const lang=()=>(d.documentElement.lang||'ar').slice(0,2);
function send(type,extra){const b=JSON.stringify({vid,type,dev,lang:lang(),...extra});try{if(navigator.sendBeacon&&navigator.sendBeacon(API+'t',new Blob([b],{type:'text/plain'})))return}catch(e){}fetch(API+'t',{method:'POST',body:b,keepalive:true,headers:{'content-type':'text/plain'}}).catch(()=>{})}
window.__track=send;
if(!/[?&]notrack/.test(location.search)&&!localStorage.getItem('mgu-adm-self')){
 send('pv',{ref:document.referrer||''});
 const seen=new Set();const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!seen.has(e.target.id)){seen.add(e.target.id);send('sec',{sec:e.target.id});io.unobserve(e.target)}}),{threshold:.35});
 d.querySelectorAll('section[id]').forEach(s=>io.observe(s));
 d.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href');const t=/^tel:/.test(h)?'call':/wa\.me|whatsapp/.test(h)?'wa':/^mailto:/.test(h)?'mail':'';if(!t)return;const s=a.closest('section[id],header,footer,.fab');send(t,{sec:s?(s.id||s.tagName.toLowerCase()||s.className):''})},true);
}
})();
