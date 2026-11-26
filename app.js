/* v31 CMS prelude: visual config from cache, before scenes init */
(()=>{let c=null;try{c=JSON.parse(localStorage.getItem('mgu-cms')||'null')}catch(e){}window.__cmsVisSig=c?JSON.stringify([c.hero_imgs||[],c.gallery_hide||[],c.gallery_add||[]]):'';if(!c)return;const d=document;try{
 if(c.accent)d.documentElement.style.setProperty('--y',c.accent);
 const hb=d.querySelector('.hero-bg');if(hb&&c.hero_imgs&&c.hero_imgs.length){hb.innerHTML='';c.hero_imgs.forEach((u,i)=>{const im=d.createElement('img');im.className='hs'+(i?'':' on');im.src=u;im.alt='';if(i)im.loading='lazy';hb.appendChild(im)})}
 const tr=d.querySelector('.fs-track');if(tr){const hide=new Set(c.gallery_hide||[]);if(hide.size)[...tr.querySelectorAll('.gi')].forEach(g=>{if(hide.has(g.dataset.src)||hide.has(new URL(g.dataset.src,location.href).href))g.remove()});
  (c.gallery_add||[]).slice().reverse().forEach(u=>{const b=d.createElement('button');b.className='gi';b.type='button';b.dataset.src=u;const im=d.createElement('img');im.src=u;im.alt='من الميدان - بوابة الآليات المتحدة';im.loading='lazy';b.appendChild(im);tr.prepend(b)})}
}catch(e){console.warn('cms-pre',e)}})();

(()=>{
const d=document,root=d.documentElement;root.classList.add('js');
const RM=false;
const WA_NUM='966551005418';
const $=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const hasG=()=>window.gsap&&window.ScrollTrigger;
$('#yr').textContent=new Date().getFullYear();

/* ---------- Reveal (cheap IO) ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=((i%4)*70)+'ms';io.observe(el)});
$$('.card,.gi').forEach(el=>io.observe(el));

/* ---------- Loader ---------- */
const loader=$('#loader'),ldp=$('#ldp');
let lenis=null;
function endLoader(){
  d.body.classList.remove('is-loading');
  if(RM||!hasG()){loader.remove();heroIntro();return}
  const tl=gsap.timeline({onComplete:()=>{loader.remove()}});
  tl.to('.ld-truck',{x:-(innerWidth+600),duration:1.1,ease:'power2.in',onUpdate:()=>window.__rigQ&&window.__rigQ()})
    .to(loader,{clipPath:'inset(0 0 100% 0)',duration:.8,ease:'expo.inOut'},'-=.35')
    .add(heroIntro,'-=.45');
}
function runLoader(){
  if(RM){endLoader();return}
  const start=performance.now(),MIN=1500;let p=0,loaded=d.readyState==='complete';
  addEventListener('load',()=>loaded=true,{once:true});
  setTimeout(()=>loaded=true,4500);
  const truck=$('.ld-truck'),roadW=$('.ld-road').offsetWidth,bar=$('#ldbar'),lane=$('.ld-lane');
  (function tick(t){
    const target=loaded?100:Math.min(88,(t-start)/MIN*88);
    p+= (target-p)*.12; if(target===100&&p>99.4)p=100;
    ldp.textContent=Math.round(p);
    const tw=truck.offsetWidth;truck.style.left=(roadW-(p/100)*(roadW/2+tw/2))+'px';if(bar)bar.style.width=p+'%';if(lane)lane.style.backgroundPosition=(-p*6)+'px 0';window.__rigQ&&window.__rigQ();
    if(p>=100&&t-start>MIN){endLoader();return}
    requestAnimationFrame(tick);
  })(start);
}

/* ---------- Hero intro ---------- */
let heroDone=false;
function heroIntro(){
  if(heroDone)return;heroDone=true;
  if(RM||!hasG())return counters();
  const tl=gsap.timeline({defaults:{ease:'expo.out'}});
  tl.from('.hero-title .ln>span',{yPercent:110,duration:1.2,stagger:.12})
    .from('.kicker',{y:20,opacity:0,duration:.8},'<.1')
    .from('.hero-tag,.hero-sub',{y:24,opacity:0,duration:.9,stagger:.08},'<.2')
    .from('.hero-cta .btn',{y:24,opacity:0,duration:.8,stagger:.07},'<.15')
    .fromTo('.hp-clip',{clipPath:'polygon(100% 0,100% 0,100% 100%,100% 100%)'},{clipPath:'polygon(8% 0,100% 0,92% 100%,0 100%)',duration:1.4,ease:'expo.inOut'},0.1)
    .from('.hp-clip img',{scale:1.25,duration:1.8},0.1)
    .from('.hero-photo figcaption',{x:40,opacity:0,duration:.8},'-=.8')
    .from('.stat',{y:30,opacity:0,duration:.8,stagger:.1},'-=.9')
    .add(counters,'-=.8');
}
function counters(){
  $$('[data-count]').forEach(el=>{
    const n=+el.dataset.count,suf=el.dataset.suffix||'';
    if(RM||!hasG()){el.textContent=n.toLocaleString('en-US')+suf;return}
    const o={v:0};gsap.to(o,{v:n,duration:2,ease:'power3.out',onUpdate:()=>el.textContent=Math.round(o.v).toLocaleString('en-US')+suf});
  });
}

/* ---------- Header ---------- */
const hdr=$('header');let lastY=0;
function onScroll(y){
  hdr.classList.toggle('solid',y>30);
  hdr.classList.toggle('hide',y>lastY+4&&y>500&&!$('#nav').classList.contains('open'));
  if(y<lastY-4)hdr.classList.remove('hide');
  d.body.classList.toggle('scrolled',y>innerHeight*.6);
  lastY=y;
  const max=d.documentElement.scrollHeight-innerHeight,pr=max>0?Math.min(1,y/max):0;
  railFill.style.transform=`scaleY(${pr})`;
  railTruck.style.transform=`translateY(${pr*(railH-30)-10}px)`;
}
const railFill=$('.rail-fill'),railTruck=$('.rail-truck');let railH=$('#rail').offsetHeight;
addEventListener('resize',()=>railH=$('#rail').offsetHeight);

/* ---------- Burger ---------- */
const burger=$('.burger'),nav=$('#nav');
burger.addEventListener('click',()=>{const o=!nav.classList.contains('open');nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)});

/* ---------- Navigation with truck sweep ---------- */
const sweep=$('#sweep');let sweeping=false;
function goTo(hash){
  const t=$(hash);if(!t)return;
  nav.classList.remove('open');burger.setAttribute('aria-expanded',false);
  const jump=()=>{if(lenis)lenis.scrollTo(t,{immediate:true,force:true,offset:hash==='#hero'?0:-10});else t.scrollIntoView({behavior:RM?'auto':'instant'});};
  if(RM||!hasG()||sweeping){jump();return}
  sweeping=true;
  const tl=gsap.timeline({onComplete:()=>{gsap.set(sweep,{visibility:'hidden'});gsap.set('#sweep .sw-panel,#sweep .sw-stripes',{x:'105%'});sweeping=false}});
  tl.set(sweep,{visibility:'visible'})
    .to('#sweep .sw-stripes',{x:'0%',duration:.45,ease:'power3.in'})
    .to('#sweep .sw-panel',{x:'0%',duration:.45,ease:'power3.inOut'},'-=.3')
    .fromTo('.sw-truck',{x:innerWidth*.6},{x:-innerWidth*.6,duration:1,ease:'power1.inOut'},'<')
    .add(()=>{jump();ScrollTrigger.refresh()},'-=.45')
    .to('#sweep .sw-panel',{x:'-105%',duration:.5,ease:'power3.inOut'},'-=.2')
    .to('#sweep .sw-stripes',{x:'-105%',duration:.45,ease:'power3.inOut'},'-=.38');
}
$$('[data-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();goTo(a.getAttribute('href'))}));

/* ---------- GSAP scenes ---------- */
function scenes(){
  gsap.registerPlugin(ScrollTrigger);
  if(!RM){
    lenis=new Lenis({duration:.55,smoothWheel:true,wheelMultiplier:1.5,touchMultiplier:1.6});window.__lenis=lenis;
    lenis.on('scroll',e=>{ScrollTrigger.update();onScroll(e.scroll)});
    gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  }else addEventListener('scroll',()=>onScroll(scrollY),{passive:true});
  if(RM)return;
  // hazard stripe dividers: extend + roll
  $$('.hz').forEach(el=>{
    gsap.fromTo(el,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 55%',scrub:.6}});
    gsap.to(el,{backgroundPosition:'-360px 0',ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}});
  });
  $$('.lanes i').forEach((el,i)=>gsap.to(el,{backgroundPosition:`${(i%2?1:-1)*(400+i*200)}px 0`,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}));
  // section titles: words drive in from the right
  $$('.sec-title').forEach(h=>{
    const sm=h.querySelector('small');
    [...h.childNodes].forEach(n=>{if(n.nodeType===3&&n.textContent.trim()){const f=d.createDocumentFragment();n.textContent.trim().split(/\s+/).forEach((w,i,a)=>{const s=d.createElement('span');s.className='w';s.textContent=w;f.appendChild(s);if(i<a.length-1)f.appendChild(d.createTextNode(' '))});h.replaceChild(f,n)}});
    const tl=gsap.timeline({scrollTrigger:{trigger:h,start:'top 86%'}});
    if(sm)tl.from(sm,{x:60,opacity:0,duration:.7,ease:'power3.out'});
    tl.from(h.querySelectorAll('.w'),{x:80,opacity:0,duration:.9,stagger:.045,ease:'expo.out'},'<.1');
  });
  // parallax photos
  $$('.plx').forEach(img=>gsap.fromTo(img,{yPercent:-8},{yPercent:6,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
  gsap.to('.hp-clip img',{yPercent:10,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.hero-copy',{y:-60,opacity:.2,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  // fleet cards tilt-in
  gsap.utils.toArray('.fleet-card').forEach((c,i)=>gsap.from(c,{x:i?-80:80,rotate:i?-2:2,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 85%'}}));
  // gallery: lane wipe on each photo
  // CTA: truck drives in, stripes roll
  gsap.from('.cta-truck',{x:-260,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'#cta',start:'top 75%'}});
  gsap.to('.cta-stripes',{backgroundPosition:'240px 0',ease:'none',scrollTrigger:{trigger:'#cta',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.from('.mega',{yPercent:40,opacity:0,ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:true}});
  // active nav
  $$('[data-station]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 45%',end:'bottom 45%',onToggle:st=>{if(st.isActive){$$('#nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+s.id))}}}));
  addEventListener('load',()=>ScrollTrigger.refresh());
}

/* ---------- Shader background (MGU colours) ---------- */
function shader(){
  const c=$('#sh'),gl=c.getContext('webgl',{antialias:false,powerPreference:'low-power'});if(!gl)return;
  const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}';
  const fs=`precision mediump float;uniform vec2 r;uniform float t,s;
  float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
  void main(){vec2 uv=gl_FragCoord.xy/r;vec2 q=uv*vec2(r.x/r.y,1.)*1.8;float tt=t*.06+s*.0006;
  float f=fbm(q+fbm(q+vec2(tt,-tt*.7))*1.7);
  vec3 asp=vec3(.078,.082,.09),ch=vec3(.165,.176,.192),y=vec3(.996,.835,0.),a=vec3(1.,.588,0.);
  vec3 col=mix(asp,ch,smoothstep(.25,.7,f));col=mix(col,a,smoothstep(.52,.8,f)*.55);col=mix(col,y,smoothstep(.66,.9,f)*.5);
  float road=smoothstep(.006,0.,abs(fract((uv.x+uv.y*.35)*3.-t*.12)-.5)-.47)*.05;col+=vec3(road);
  col*=1.-.45*length(uv-vec2(.7,.55));col+=(h(gl_FragCoord.xy+fract(t))-.5)*.05;gl_FragColor=vec4(col,1.);}`;
  const S=(ty,src)=>{const x=gl.createShader(ty);gl.shaderSource(x,src);gl.compileShader(x);return x};
  const pr=gl.createProgram();gl.attachShader(pr,S(gl.VERTEX_SHADER,vs));gl.attachShader(pr,S(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
  const ur=gl.getUniformLocation(pr,'r'),ut=gl.getUniformLocation(pr,'t'),us=gl.getUniformLocation(pr,'s');
  const scale=innerWidth<700?.33:.6;
  function rs(){c.width=Math.round(c.clientWidth*scale);c.height=Math.round(c.clientHeight*scale);gl.viewport(0,0,c.width,c.height)}
  addEventListener('resize',rs);rs();
  let vis=true,raf=0;
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(L)}).observe(c);
  function L(ms){raf=0;if(!vis)return;gl.uniform2f(ur,c.width,c.height);gl.uniform1f(ut,ms/1000);gl.uniform1f(us,scrollY);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);if(!RM)raf=requestAnimationFrame(L)}
  raf=requestAnimationFrame(L);
}

/* ---------- PWA install ---------- */
const ib=$('.btn-install'),hint=$('#ios-hint');let deferred=null;
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
if(!standalone){
  if(isIOS)ib.hidden=false;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;ib.hidden=false});
}
addEventListener('appinstalled',()=>{ib.hidden=true;deferred=null});
ib.addEventListener('click',async()=>{
  if(deferred){deferred.prompt();await deferred.userChoice.catch(()=>{});deferred=null;ib.hidden=true}
  else hint.hidden=false;
});
hint.addEventListener('click',e=>{if(e.target===hint||e.target.closest('.ih-x'))hint.hidden=true});
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

/* ---------- Quote form → WhatsApp ---------- */
$('#qform').addEventListener('submit',e=>{
  e.preventDefault();const f=e.target,err=$('.form-err',f);let ok=true;
  $$('[required]',f).forEach(i=>{const bad=!i.value.trim();i.classList.toggle('bad',bad);if(bad)ok=false});
  err.hidden=ok;if(!ok)return;
  const v=n=>f.elements[n].value.trim();
  const lines=['السلام عليكم، أرغب في عرض سعر لخدمة نقل:','الاسم: '+v('name'),'الجوال: '+v('phone'),'نوع الحمولة: '+v('type'),'من: '+v('from'),'إلى: '+v('to')];
  if(v('date'))lines.push('التاريخ المفضل: '+v('date'));if(v('notes'))lines.push('ملاحظات: '+v('notes'));
  window.open('https://wa.me/'+(window.__waNum||WA_NUM)+'?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
});

/* ---------- Share ---------- */
$('.share').addEventListener('click',async()=>{
  const data={title:'بوابة الآليات المتحدة',text:'بوابة الآليات المتحدة المحدودة - قسم النقليات: نقود أعمالك بثقة… حلول نقل ثقيل باحتراف',url:location.origin+'/'};
  if(navigator.share){try{await navigator.share(data)}catch(e){}}
  else{try{await navigator.clipboard.writeText(data.url);$('.share').lastChild.textContent=' تم نسخ الرابط'}catch(e){}}
});

/* ---------- CEO message ---------- */
$('.more').addEventListener('click',e=>{const q=$('#ceo blockquote'),o=!q.classList.contains('open');q.classList.toggle('open',o);e.target.textContent=o?(window.T?T('إخفاء'):'إخفاء'):(window.T?T('اقرأ الكلمة كاملة'):'اقرأ الكلمة كاملة');e.target.setAttribute('aria-expanded',o);if(hasG())setTimeout(()=>ScrollTrigger.refresh(),750)});

/* ---------- Lightbox ---------- */
const lb=$('#lb'),lbi=$('#lb img');
const gis=$$('.gi'),lbc=$('.lb-c');let li=0;
function show(k){li=(k+gis.length)%gis.length;const g=gis[li];lbi.classList.remove('in');lbi.src=g.dataset.src;lbi.alt=$('img',g).alt;lbi.onload=()=>lbi.classList.add('in');if(lbc)lbc.textContent=(li+1)+' / '+gis.length}
function closeLb(){lb.hidden=true;d.body.style.overflow='';if(lenis)lenis.start()}
gis.forEach((g,k)=>g.addEventListener('click',()=>{show(k);lb.hidden=false;d.body.style.overflow='hidden';if(lenis)lenis.stop()}));
lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-x'))closeLb()});
$('.lb-prev').addEventListener('click',e=>{e.stopPropagation();show(li+1)});$('.lb-next').addEventListener('click',e=>{e.stopPropagation();show(li-1)});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(li+1);if(e.key==='ArrowRight')show(li-1)});
let sx=null;lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)show(li+(dx>0?-1:1));sx=null});

/* ---------- Boot ---------- */
function boot(){
  if(hasG()){try{scenes()}catch(e){console.error(e);addEventListener('scroll',()=>onScroll(scrollY),{passive:true})}}
  else addEventListener('scroll',()=>onScroll(scrollY),{passive:true});
  shader();runLoader();onScroll(scrollY);
}
if(d.readyState!=='loading')boot();else d.addEventListener('DOMContentLoaded',boot);
})();

/* ===== v2 effects ===== */
(()=>{
const d=document,RM=false;
const $=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
// image reveal + titles
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}}),{threshold:.12});
$$('.rimg,.sec-title').forEach(el=>io2.observe(el));
$$('.gi').forEach((el,i)=>{el.style.transitionDelay=((i%3)*90)+'ms'});
// progress, totop, ticker velocity, skew
const prog=$('#prog'),tt=$('.totop'),pr=$('.tt-pr');
const tks=$$('.tk2 .tk-move');
let lastY=scrollY,vel=0,skew=0,dir=1;
tt&&tt.addEventListener('click',()=>{if(window.__lenis)window.__lenis.scrollTo(0,{duration:1.6});else scrollTo({top:0,behavior:'smooth'})});
function frame(){
  const y=scrollY,h=d.documentElement.scrollHeight-innerHeight,p=h>0?y/h:0;
  const dy=y-lastY;lastY=y;vel+=(dy-vel)*.15;if(Math.abs(dy)>0.5)dir=dy>0?1:-1;
  if(prog)prog.style.transform=`scaleX(${p})`;
  if(tt){tt.classList.toggle('show',y>innerHeight*.8);if(pr)pr.style.strokeDashoffset=100.5*(1-p)}
  if(!RM){
    const sp=1+Math.min(4,Math.abs(vel)/6);
    tks.forEach(t=>{const a=t.getAnimations?t.getAnimations()[0]:null;if(a){a.playbackRate=sp*(dir>0?1:-1)*(t.closest('.rev')?-1:1)}});
    skew+=(Math.max(-6,Math.min(6,vel*.25))-skew)*.12;
    d.documentElement.style.setProperty('--skew',skew.toFixed(2)+'deg');
  }
  requestAnimationFrame(frame);
}
if(!RM)d.body.classList.add('skew-on');
requestAnimationFrame(frame);
// GSAP extras
addEventListener('load',()=>{
  if(RM||!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  $$('.sec-title').forEach(t=>{gsap.fromTo(t,{letterSpacing:'.02em'},{letterSpacing:'0em',scrollTrigger:{trigger:t,start:'top 90%',end:'top 40%',scrub:true}})});
  $$('.tk-y,.tk-dark').forEach(t=>gsap.fromTo(t,{xPercent:6},{xPercent:-6,ease:'none',scrollTrigger:{trigger:t,start:'top bottom',end:'bottom top',scrub:true}}));
  $$('.ct,.feat,.card').forEach((c,i)=>gsap.from(c,{y:60,rotateX:-18,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%'}}));
  gsap.to('.hero-logo',{rotate:360,scale:.6,opacity:.2,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.from('.hero-logo',{scale:0,rotate:-180,duration:1.4,ease:'back.out(1.6)',delay:1.6});
},{once:true});
})();

/* ===== v3 motion ===== */
(()=>{
const d=document,RM=false;
const $$=(s,c=d)=>[...c.querySelectorAll(s)];
// ripple on tap
d.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn,.mini,.fab a,.tbtn');if(!b||RM)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=d.createElement('span');sp.className='rip';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),650)});
// shine on photos
const io3=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io3.unobserve(e.target)}}),{threshold:.3});
$$('.plx-frame,.gi,.ceo-photo,.hp-clip').forEach(el=>{el.classList.add('shine');io3.observe(el)});
// cursor glow (desktop)
if(!RM&&matchMedia('(hover:hover)').matches){const g=d.createElement('div');g.className='cursor-glow';d.body.appendChild(g);addEventListener('pointermove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'},{passive:true});
 const hp=d.querySelector('.hp-clip');hp&&d.querySelector('#hero').addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;hp.style.transform=`rotateY(${x*10}deg) rotateX(${-y*8}deg)`})}
addEventListener('load',()=>{
 if(RM||!window.gsap||!window.ScrollTrigger)return;
 // road wipes: road draws, truck drives across with scroll
 $$('.roadwipe').forEach(w=>{
  const tl=gsap.timeline({scrollTrigger:{trigger:w,start:'top 95%',end:'bottom 20%',scrub:.6}});

 });
 // sections open like a trailer door (clip reveal) + slight scale
 $$('main > section.sec').forEach(s=>{
  if(s.id==='hero'||s.id==='field'||s.id==='services')return;
  gsap.fromTo(s,{clipPath:'inset(6% 5% 0% 5% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'top 35%',scrub:true}});
 });
 // cards fly from alternating sides
 $$('.trio .card,.features .feat,.contact-grid .ct').forEach((c,i)=>{gsap.fromTo(c,{x:(i%2?-1:1)*80,opacity:0,rotate:(i%2?-4:4)},{x:0,opacity:1,rotate:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%'}})});
 // client logos pop
 gsap.from('.logos img, .clients img',{scale:.4,opacity:0,stagger:.08,duration:.8,ease:'back.out(2)',scrollTrigger:{trigger:'#clients',start:'top 75%'}});
 // big footer word
 gsap.fromTo('.mega',{yPercent:60,scale:.8},{yPercent:0,scale:1,ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:true}});
 ScrollTrigger.refresh();
},{once:true});
})();

/* ===== v8 side-view rig on flat road ===== */
(()=>{
const ws=[...document.querySelectorAll('.roadwipe')];if(!ws.length)return;let raf=0;
function upd(){raf=0;const vh=innerHeight,vw=innerWidth;
 ws.forEach(w=>{const r=w.getBoundingClientRect();if(r.bottom<-50||r.top>vh+50)return;
  const p=Math.min(1,Math.max(0,(vh-r.top)/(vh+r.height)));
  const t=w.querySelector('.rw-truck'),tw=t.offsetWidth;
  const x=(vw+10)-p*(vw+tw+20);              // front (left) leads: drives left on scroll down, backs up on scroll up
  t.style.transform=`translate3d(${x}px,0,0)`;
  const deg=-x*1.6; t.querySelectorAll('.wl').forEach(g=>g.style.transform=`rotate(${deg}deg)`);
 })}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
addEventListener('scroll',q,{passive:true});addEventListener('resize',q);addEventListener('load',q);q();
if(window.__lenis)window.__lenis.on('scroll',q);setInterval(q,250);
})();
/* ===== v7: lowbed services + film strip + hero rig (plain JS, scroll-driven) ===== */
(()=>{
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)];
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const pin=$('.lb-pin'),rig=$('.lb-rig'),cards=$$('.lb-card'),dots=$$('.lb-dots i'),cnt=$('.lb-count b'),wh=$$('.lb-rig .wl');
const fpin=$('.fs-pin'),ftrack=$('.fs-track'),frames=ftrack?[...ftrack.children]:[];
let cur=-1,raf=0;
function sizeFS(){if(!fpin)return;if(innerWidth>=1024){fpin.style.height='';fpin.dataset.dist=0;return}const dist=Math.max(0,ftrack.scrollWidth-innerWidth);fpin.style.height=(dist+innerHeight)+'px';fpin.dataset.dist=dist}
function upd(){raf=0;const vh=innerHeight,vw=innerWidth;
 if(pin){const r=pin.getBoundingClientRect(),tot=pin.offsetHeight-vh;let p=Math.min(1,Math.max(0,-r.top/tot));
  const n=cards.length,seg=Math.min(n-1e-4,p*n),i=Math.floor(seg),t=seg-i;
  const rw=rig.offsetWidth,off=vw/2+rw/2+40;let x;
  if(t<.32)x=off*(1-ease(t/.32));else if(t<.68)x=0;else x=-off*ease((t-.68)/.32);
  rig.style.transform=`translate3d(${x-rw/2}px,0,0)`;
  wh.forEach(w=>w.style.transform=`rotate(${-x*1.6}deg)`);
  if(i!==cur){cur=i;cards.forEach((c,k)=>c.classList.toggle('on',k===i));dots.forEach((c,k)=>c.classList.toggle('on',k===i));if(cnt)cnt.textContent=String(i+1).padStart(2,'0')}}
 if(fpin&&innerWidth<1024){const r=fpin.getBoundingClientRect(),dist=+fpin.dataset.dist||0,tot=fpin.offsetHeight-vh;const p=tot>0?Math.min(1,Math.max(0,-r.top/tot)):0;
  const rtl=getComputedStyle(ftrack).direction==='rtl';ftrack.style.transform=`translate3d(${(rtl?1:-1)*p*dist}px,0,0)`;
  frames.forEach(f=>{const b=f.getBoundingClientRect();if(b.right<-200||b.left>vw+200)return;const dd=((b.left+b.width/2)-vw/2)/vw;
   f.style.transform=`rotateY(${dd*-28}deg) scale(${1-Math.min(.22,Math.abs(dd)*.25)})`})}
}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
addEventListener('scroll',q,{passive:true});addEventListener('resize',()=>{sizeFS();q()});
addEventListener('load',()=>{sizeFS();q();window.ScrollTrigger&&ScrollTrigger.refresh()});
if(window.__lenis)window.__lenis.on('scroll',q);
sizeFS();q();setInterval(q,300);
$$('.fs-track img').forEach(im=>im.complete||im.addEventListener('load',()=>{sizeFS();q()},{once:true}));
// hero: Renault drives in and pulls the title behind it

})();

/* v13: wheels/road driven only by scroll, true rolling (angle = distance / radius), only in-view rigs */
(()=>{const rigs=[...document.querySelectorAll('.rig')],roads=[...document.querySelectorAll('.rw-road,.lb-road')];if(!rigs.length)return;
const vis=new Set(),rv=new Set();const io=new IntersectionObserver(es=>es.forEach(e=>{const s=e.target.classList.contains('rig')?vis:rv;e.isIntersecting?s.add(e.target):s.delete(e.target)}),{rootMargin:'80px'});
rigs.forEach(r=>{io.observe(r);r._w=[...r.querySelectorAll('.wh img')];r._last=null;r._a=0});roads.forEach(e=>io.observe(e));
let raf=0;function upd(){raf=0;const D=scrollY*0.9;
 rv.forEach(e=>{const p=D.toFixed(1)+'px 0';e.style.backgroundPosition=p;const i=e.firstElementChild;if(i)i.style.backgroundPosition=p});
 vis.forEach(r=>{const onRoad=!!r.closest('.roadwipe,.lb-scene');const x=r.getBoundingClientRect().left-(onRoad?D:0);
  if(r._last===null){r._last=x;return}const d=x-r._last;r._last=x;if(Math.abs(d)<0.01)return;
  r._w.forEach(img=>{const rad=(img.offsetWidth/2)||20;img._a=(img._a||0)+d/rad*57.2958;img.style.transform='rotate('+img._a.toFixed(2)+'deg)'})})}
function q(){if(!raf)raf=requestAnimationFrame(upd)}
window.__rigQ=q;
addEventListener('scroll',q,{passive:true});addEventListener('resize',q);
/* the hero rig drives in via animation: follow it while it animates */
const h=document.querySelector('.hero-rig');if(h){let t0=performance.now();(function k(n){q();if(n-t0<4000)requestAnimationFrame(k)})(t0)}
q()})();

/* v15: hero road, rotating words, skip buttons, gallery HUD, contact bar */
(()=>{const d=document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
const hr=$('.hero-road .hero-rig');
if(hr){let park=null,intro=0,t0=0;
 const target=()=>{const w=hr.offsetWidth,W=hr.parentNode.offsetWidth;return innerWidth>=1024?W*.06:(W-w)/2};
 function place(){const p=target();let x;
  if(intro<1){const e=1-Math.pow(1-intro,3);x=innerWidth+40+(p-innerWidth-40)*e}else x=p;
  x-=Math.max(0,scrollY)*1.25;hr.style.transform='translate3d('+x.toFixed(1)+'px,0,0)';window.__rigQ&&window.__rigQ()}
 function run(n){if(!t0)t0=n;intro=Math.min(1,(n-t0)/1800);place();if(intro<1)requestAnimationFrame(run)}
 hr.style.transform='translate3d('+(innerWidth+40)+'px,0,0)';
 const wait=()=>{if(d.getElementById('loader'))return setTimeout(wait,120);requestAnimationFrame(run)};setTimeout(wait,200);
 addEventListener('scroll',()=>{if(intro>=1)requestAnimationFrame(place)},{passive:true});addEventListener('resize',place)}
const rot=$('.rot');if(rot){let W=rot.dataset.words.split('|');let k=0;setInterval(()=>{W=rot.dataset.words.split('|');rot.classList.add('out');setTimeout(()=>{k=(k+1)%W.length;rot.textContent=window.T?T(W[k]):W[k];rot.classList.remove('out')},320)},2300)}
$$('.skip-btn').forEach(b=>b.addEventListener('click',()=>{const el=$(b.dataset.skip);if(!el)return;const y=el.getBoundingClientRect().top+scrollY+el.offsetHeight-40;
 if(window.__lenis)window.__lenis.scrollTo(y,{duration:1.2});else scrollTo({top:y,behavior:'smooth'})}));
const fp=$('.fs-pin'),fr=fp?[...fp.querySelectorAll('.fs-track>*')]:[],fn=$('.fs-n b'),ft=$('.fs-n em');if(ft)ft.textContent=String(fr.length).padStart(2,'0');
let fr0=-1,raf=0;function fsu(){raf=0;if(!fp)return;const r=fp.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const c=innerWidth/2;let best=0,bd=1e9;
 fr.forEach((f,i)=>{const b=f.getBoundingClientRect(),dd=Math.abs(b.left+b.width/2-c);if(dd<bd){bd=dd;best=i}});
 if(best!==fr0){fr0=best;fr.forEach((f,i)=>f.classList.toggle('cur',i===best));if(fn)fn.textContent=String(best+1).padStart(2,'0')}}
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(fsu)},{passive:true});fsu();
const hero=$('#hero');addEventListener('scroll',()=>{d.body.classList.toggle('show-cbar',scrollY>innerHeight*.55)},{passive:true});
})();

/* v16: draggable / clickable side rail with section stations */
(()=>{const d=document,rail=d.getElementById('rail');if(!rail)return;const truck=rail.querySelector('.rail-truck');
const secs=[...d.querySelectorAll('[data-station]')];
const names={hero:'الرئيسية',about:'من نحن',services:'خدماتنا',fleet:'الأسطول',field:'المعرض',clients:'عملاؤنا',contact:'تواصل'};
const tip=d.createElement('i');tip.className='rail-tip';rail.appendChild(tip);
const T=s=>window.T?window.T(s):s;
const sts=secs.map(s=>{const b=d.createElement('button');b.type='button';b.className='rail-st';b.innerHTML='<span>'+T(names[s.id]||s.id)+'</span>';b.setAttribute('aria-label',T(names[s.id]||s.id));rail.appendChild(b);
 b.addEventListener('click',e=>{e.stopPropagation();go(s.getBoundingClientRect().top+scrollY-10,true)});return b});
const max=()=>d.documentElement.scrollHeight-innerHeight;
function layout(){const M=max();secs.forEach((s,i)=>{const y=s.getBoundingClientRect().top+scrollY;sts[i].style.top=(Math.min(1,y/M)*100)+'%'})}
function go(y,smooth){y=Math.max(0,Math.min(max(),y));if(window.__lenis){window.__lenis.scrollTo(y,smooth?{duration:1}:{immediate:true})}else scrollTo({top:y,behavior:smooth?'smooth':'auto'})}
function cur(){const y=scrollY+innerHeight*.4;let k=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top+scrollY<=y)k=i});sts.forEach((b,i)=>b.classList.toggle('on',i===k));
 const M=max(),p=M>0?scrollY/M:0;rail.setAttribute('aria-valuenow',Math.round(p*100));tip.style.top=(p*100)+'%';tip.textContent=T(names[secs[k].id]||'')}
let dragging=false,moved=false;
function yFrom(e){const r=rail.getBoundingClientRect();return Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))}
rail.addEventListener('pointerdown',e=>{if(e.target.closest('.rail-st'))return;dragging=true;moved=false;rail.classList.add('drag');rail.setPointerCapture(e.pointerId);go(yFrom(e)*max(),!e.target.closest('.rail-truck'));e.preventDefault()});
rail.addEventListener('pointermove',e=>{if(!dragging)return;moved=true;go(yFrom(e)*max(),false)});
const end=()=>{dragging=false;rail.classList.remove('drag')};rail.addEventListener('pointerup',end);rail.addEventListener('pointercancel',end);
rail.addEventListener('keydown',e=>{const s=innerHeight*.8;if(e.key==='ArrowDown'||e.key==='PageDown'){go(scrollY+s,true);e.preventDefault()}if(e.key==='ArrowUp'||e.key==='PageUp'){go(scrollY-s,true);e.preventDefault()}if(e.key==='Home')go(0,true);if(e.key==='End')go(max(),true)});
rail.addEventListener('wheel',e=>{go(scrollY+e.deltaY*2,false);e.preventDefault()},{passive:false});
addEventListener('scroll',cur,{passive:true});addEventListener('resize',()=>{layout();cur()});addEventListener('load',()=>{layout();cur()});setTimeout(()=>{layout();cur()},1500);layout();cur();
})();

/* v17: reveal safety net (never leave images/cards hidden) */
(()=>{const d=document;function chk(){const H=innerHeight;d.querySelectorAll('.rimg:not(.in),.rv:not(.in),.card:not(.in),.gi:not(.in),.sec-title:not(.in)').forEach(e=>{const b=e.getBoundingClientRect();if(b.top<H*.92&&b.bottom>0)e.classList.add('in')})}
addEventListener('scroll',()=>requestAnimationFrame(chk),{passive:true});setInterval(chk,700);chk()})();

(()=>{const b=document.querySelector('.fs-more'),t=document.querySelector('.fs-track');if(!b||!t)return;b.addEventListener('click',()=>{const a=t.classList.toggle('all');b.textContent=a?(window.T?T('عرض أقل'):'عرض أقل'):(window.T?T('عرض كل الصور'):'عرض كل الصور')})})();

/* v19 hero slideshow */
(()=>{const s=[...document.querySelectorAll('.hero-bg .hs')];if(s.length<2)return;let k=0;
setInterval(()=>{if(document.hidden||scrollY>innerHeight)return;s[k].classList.remove('on');k=(k+1)%s.length;s[k].classList.add('on')},5000)})();

/* v21 customization */
(()=>{const d=document,root=d.documentElement,K='mgu-prefs',btn=d.querySelector('.cust-btn'),pn=d.querySelector('.cust');if(!btn||!pn)return;
const def={fs:'1',speed:'normal',motion:'on',accent:'',rail:'on'};let P={};try{P=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}P={...def,...P};
const sp={slow:{duration:1.1,wheelMultiplier:.8,touchMultiplier:1},normal:{duration:.55,wheelMultiplier:1.5,touchMultiplier:1.6},fast:{duration:.35,wheelMultiplier:2.4,touchMultiplier:2.4}};
function applyP(){root.style.setProperty('--fs',P.fs);{let ca='';try{ca=(JSON.parse(localStorage.getItem('mgu-cms')||'{}')||{}).accent||''}catch(e){}const ac=P.accent||ca;if(ac)root.style.setProperty('--y',ac);else root.style.removeProperty('--y')}
 root.classList.toggle('calm',P.motion==='off');root.classList.toggle('no-rail',P.rail==='off');
 const l=window.__lenis;if(l&&l.options)Object.assign(l.options,sp[P.speed]||sp.normal);sync()}
function cur(k){if(k==='theme')return root.dataset.theme==='light'?'light':'dark';if(k==='lang'){try{return localStorage.getItem('mgu-lang')||'ar'}catch(e){return 'ar'}}return P[k]}
function sync(){pn.querySelectorAll('.seg').forEach(s=>{const v=cur(s.dataset.k);s.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===v))})}
pn.querySelectorAll('.seg').forEach(s=>s.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const k=s.dataset.k,v=b.dataset.v;
 if(k==='theme'){if(cur('theme')!==v)d.querySelector('.theme-btn')?.click();setTimeout(sync,50);return}
 if(k==='lang'){d.querySelector('.lang-menu [data-lang="'+v+'"]')?.click();setTimeout(sync,80);return}
 P[k]=v;try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}applyP()}));
pn.querySelector('.cust-reset').addEventListener('click',()=>{P={...def};try{localStorage.removeItem(K)}catch(e){}applyP()});
btn.addEventListener('click',()=>{pn.hidden=!pn.hidden;sync()});pn.querySelector('.cust-x').addEventListener('click',()=>pn.hidden=true);
d.addEventListener('click',e=>{if(e.isTrusted&&!pn.hidden&&!pn.contains(e.target)&&!btn.contains(e.target))pn.hidden=true});
applyP();setTimeout(applyP,1500)})();

/* v29 glowing side lamps */
(()=>{const P=[[45.89,74.37],[50.89,74.37],[55.88,74.37],[60.88,74.37],[90.87,74.37],[95.87,74.37],[64.52,73.99],[71.10,73.99],[79.96,73.99],[86.55,73.99],[23.63,62.04],[29.08,62.04],[34.53,62.04],[39.98,62.04]];document.querySelectorAll('.rig').forEach(r=>{P.forEach((p,i)=>{const s=document.createElement('b');s.className='lamp';s.style.left=p[0]+'%';s.style.top=p[1]+'%';s.style.animationDelay=(i*.12)+'s';r.appendChild(s)})})})();

/* v30 CMS: content from mgu-admin */
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

/* v31 analytics */
(()=>{const API=(window.__CMS_URL||'https://mgu-admin.sites.tab.bot')+'/api/',d=document;let vid;try{vid=localStorage.getItem('mgu-vid');if(!vid){vid=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('mgu-vid',vid)}}catch(e){vid='x'+Math.random()}
const dev=/iPad|Tablet/i.test(navigator.userAgent)||(/Android/i.test(navigator.userAgent)&&!/Mobile/i.test(navigator.userAgent))?'tablet':(/Mobi|iPhone|Android/i.test(navigator.userAgent)?'mobile':'desktop');
const lang=()=>(d.documentElement.lang||'ar').slice(0,2);
function send(type,extra){const b=JSON.stringify({vid,type,dev,lang:lang(),...extra});try{if(navigator.sendBeacon&&navigator.sendBeacon(API+'t',new Blob([b],{type:'text/plain'})))return}catch(e){}fetch(API+'t',{method:'POST',body:b,keepalive:true,headers:{'content-type':'text/plain'}}).catch(()=>{})}
window.__track=send;
if(!/[?&]notrack/.test(location.search)&&!localStorage.getItem('mgu-adm-self')){
 send('pv',{ref:document.referrer||''});
 const seen=new Set();const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!seen.has(e.target.id)){seen.add(e.target.id);send('sec',{sec:e.target.id});io.unobserve(e.target)}}),{threshold:.35});
 d.querySelectorAll('section[id]').forEach(s=>io.observe(s));
 d.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href');const t=/^tel:/.test(h)?'call':/wa\.me|whatsapp/.test(h)?'wa':/^mailto:/.test(h)?'mail':'';if(!t)return;const s=a.closest('section[id],header,footer,.fab,.cbar');send(t,{sec:s?(s.id||s.tagName.toLowerCase()||s.className):''})},true);
}
const qf=d.getElementById('qform');if(qf)qf.addEventListener('submit',()=>{setTimeout(()=>{if(qf.querySelector('.form-err')&&!qf.querySelector('.form-err').hidden)return;const c=(window.__cmsCfg&&window.__cmsCfg())||{};if(c.quote_store===false)return;const f=Object.fromEntries(new FormData(qf).entries());if(!f.name||!f.phone)return;
 fetch(API+'quote',{method:'POST',body:JSON.stringify(f),keepalive:true,headers:{'content-type':'text/plain'}}).catch(()=>{});send('quote',{sec:'quote'})},0)},true);
})();
