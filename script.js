(() => {
  "use strict";
  const root = document.documentElement;
  const effectsOn = () => root.getAttribute('data-effects') !== 'off';
  const reduceMotion = () => !effectsOn() || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = () => matchMedia('(pointer: fine)').matches;

  /* TEMA */
  let themeTimer;
  function applyTheme(t){
    if(themeTimer)clearTimeout(themeTimer);
    root.classList.add('is-theme-transitioning');
    root.setAttribute('data-theme',t);
    themeTimer=setTimeout(()=>root.classList.remove('is-theme-transitioning'),420);
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>{
    const n=(root.getAttribute('data-theme')||'dark')==='dark'?'light':'dark';
    try{localStorage.setItem('theme',n)}catch(_){}
    applyTheme(n);
  }));

  /* EFECTOS */
  function applyEffects(s){
    try{s==='auto'?localStorage.removeItem('effects'):localStorage.setItem('effects',s)}catch(_){}
    root.setAttribute('data-effects',s);
    document.querySelectorAll('[data-effects-toggle]').forEach(b=>{
      const on=effectsOn();
      b.setAttribute('aria-pressed',on?'true':'false');
      b.title=on?'Efectos activados':'Efectos desactivados';
    });
  }
  document.querySelectorAll('[data-effects-toggle]').forEach(b=>b.addEventListener('click',()=>applyEffects(effectsOn()?'off':'on')));
  applyEffects(root.getAttribute('data-effects')||'on');

  /* SIDEBAR */
  const trigger=document.getElementById('sidebar-trigger');
  const scrim=document.getElementById('scrim');
  const sidebar=document.getElementById('sidebar');
  const closeSb=()=>{root.removeAttribute('data-sidebar-open');trigger?.setAttribute('aria-expanded','false')};
  const openSb=()=>{root.setAttribute('data-sidebar-open','');trigger?.setAttribute('aria-expanded','true')};
  trigger?.addEventListener('click',()=>root.hasAttribute('data-sidebar-open')?closeSb():openSb());
  scrim?.addEventListener('click',closeSb);
  sidebar?.addEventListener('click',e=>{if(e.target.closest('a[href]'))closeSb()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSb()});
  matchMedia('(min-width: 1024px)').addEventListener('change',e=>{if(e.matches)closeSb()});

  /* PROGRESS + BACK-TO-TOP */
  const progressBar=document.getElementById('progress');
  const backTop=document.getElementById('back-to-top');
  let ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const h=root.scrollHeight-innerHeight;
      progressBar.style.transform=`scaleX(${h>0?Math.min(1,scrollY/h):0})`;
      backTop.classList.toggle('is-visible',scrollY>480);
      ticking=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  /* ANCHOR NAV */
  const sections = ['inicio','equipo','manifiesto','bitacora','ac1','ac2','ac3','ac4','ruta'];
  const labels = {inicio:'Inicio',equipo:'Equipo',manifiesto:'Manifiesto',bitacora:'Bitácora',ac1:'AC1',ac2:'AC2',ac3:'AC3',ac4:'AC4',ruta:'Hoja de ruta'};
  const breadcrumb = document.getElementById('breadcrumb-current');
  const navLinks = [...document.querySelectorAll('#sidenav a')];
  function setActive(id){
    breadcrumb.textContent = labels[id]||'Inicio';
    navLinks.forEach(a=>{
      const h=a.getAttribute('href');
      a.classList.toggle('is-active', h === '#'+id || (id.startsWith('ac') && h==='#bitacora'));
    });
  }
  const io = new IntersectionObserver(entries=>{
    for(const e of entries){
      if(e.isIntersecting) setActive(e.target.id);
    }
  },{rootMargin:'-30% 0px -55% 0px',threshold:0});
  sections.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});

  /* STARFIELD */
  const canvas=document.getElementById('starfield');
  const ctx=canvas.getContext('2d',{alpha:true});
  let stars=[],W=0,H=0,DPR=1;
  let pointer={x:-9999,y:-9999};
  let targetParX=0,targetParY=0,parX=0,parY=0;
  let lastScrollY=scrollY;
  function resize(){
    DPR=Math.min(devicePixelRatio||1,1.5);
    W=innerWidth;H=innerHeight;
    canvas.width=Math.floor(W*DPR);canvas.height=Math.floor(H*DPR);
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    initStars();
  }
  function initStars(){
    const count=Math.min(170,Math.round(W*H/11000));
    stars=Array.from({length:count},()=>{
      const depth=Math.pow(Math.random(),1.6);
      const ang=Math.random()*Math.PI*2;
      const sp=.012+depth*.045;
      return{x:Math.random()*W,y:Math.random()*H,depth,size:depth>.8?2:depth>.4?1:0,base:.22+depth*.6,phase:Math.random()*Math.PI*2,speed:.4+Math.random()*1.1,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,warm:Math.random()<.28};
    });
  }
  function starColor(warm){
    const dark=root.getAttribute('data-theme')!=='light';
    if(dark)return warm?'240,213,154':'246,241,230';
    return warm?'140,106,31':'47,63,122';
  }
  function draw(t){
    ctx.clearRect(0,0,W,H);
    const dark=root.getAttribute('data-theme')!=='light';
    const alphaScale=dark?1:.55;
    const S=t/1000;
    const scrollDelta=scrollY-lastScrollY;lastScrollY=scrollY;
    parX+=(targetParX-parX)*.08;parY+=(targetParY-parY)*.08;
    const near=[];
    for(const s of stars){
      s.x+=s.vx;s.y+=s.vy;
      if(s.x<-4)s.x=W+4;else if(s.x>W+4)s.x=-4;
      if(s.y<-4)s.y=H+4;else if(s.y>H+4)s.y=-4;
      const tw=effectsOn()?.65+.35*Math.sin(S*s.speed+s.phase):1;
      const dpt=.25+s.depth*.75;
      const sx=s.x+parX*20*dpt;
      const sy=s.y+parY*20*dpt-scrollDelta*.05*dpt;
      const r=s.size*(1+s.depth*.5);
      ctx.globalAlpha=s.base*tw*alphaScale;
      ctx.fillStyle=`rgb(${starColor(s.warm)})`;
      ctx.beginPath();ctx.arc(((sx%W)+W)%W,((sy%H)+H)%H,r,0,Math.PI*2);ctx.fill();
      const dx=sx-pointer.x,dy=sy-pointer.y;
      if(dx*dx+dy*dy<140*140)near.push([sx,sy]);
    }
    ctx.globalAlpha=1;
    if(near.length>1){
      for(let i=0;i<Math.min(near.length,12);i++){
        const [ax,ay]=near[i];
        ctx.strokeStyle=`rgba(${starColor(false)},.18)`;
        ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();
      }
    }
  }
  let raf;
  function loop(t){draw(t);raf=requestAnimationFrame(loop)}
  function startStarfield(){cancelAnimationFrame(raf);if(!effectsOn()){ctx.clearRect(0,0,W,H);return}raf=requestAnimationFrame(loop)}
  resize();addEventListener('resize',resize,{passive:true});
  addEventListener('pointermove',e=>{
    if(!finePointer()||!effectsOn())return;
    pointer.x=e.clientX;pointer.y=e.clientY;
    targetParX=(e.clientX/W)*2-1;targetParY=(e.clientY/H)*2-1;
  },{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.x=-9999;pointer.y=-9999});
  new MutationObserver(()=>draw(performance.now())).observe(root,{attributes:true,attributeFilter:['data-theme','data-effects']});
  startStarfield();

  /* LANTERN */
  const lantern=document.getElementById('lantern');
  let lx=innerWidth/2,ly=innerHeight/2,tx=lx,ty=ly,lraf;
  function lanternLoop(){
    lx+=(tx-lx)*.12;ly+=(ty-ly)*.12;
    lantern.style.transform=`translate3d(${lx}px,${ly}px,0)`;
    if(Math.abs(tx-lx)>.3||Math.abs(ty-ly)>.3)lraf=requestAnimationFrame(lanternLoop);else lraf=0;
  }
  addEventListener('pointermove',e=>{
    if(!finePointer()||reduceMotion()){lantern.classList.remove('is-on');return}
    tx=e.clientX;ty=e.clientY;lantern.classList.add('is-on');
    if(!lraf)lraf=requestAnimationFrame(lanternLoop);
  },{passive:true});
  document.addEventListener('pointerleave',()=>lantern.classList.remove('is-on'));

  /* MAGNETIC */
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    const strength=.28;let r=null;
    el.addEventListener('pointerenter',()=>{r=el.getBoundingClientRect()});
    el.addEventListener('pointermove',e=>{
      if(reduceMotion())return;
      if(!r)r=el.getBoundingClientRect();
      const dx=e.clientX-(r.left+r.width/2);
      const dy=e.clientY-(r.top+r.height/2);
      el.style.transform=`translate(${(dx*strength).toFixed(1)}px,${(dy*strength).toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform='';r=null});
  });

  /* CONTADORES */
  document.querySelectorAll('[data-count]').forEach(el=>{
    const n=Number(el.dataset.count||0);
    if(!Number.isFinite(n))return;
    const start=performance.now();const dur=900;
    function step(t){
      const p=Math.min(1,(t-start)/dur);
      const eased=1-Math.pow(1-p,3);
      el.textContent=String(Math.round(n*eased));
      if(p<1)requestAnimationFrame(step);
    }
    if(effectsOn())requestAnimationFrame(step);else el.textContent=String(n);
  });

  /* MUSIC DOCK */
  const TRACKS={crazy:'2KP6bTmxOSEVMXAnbapkpa',superpowers:'736PP5LTtREkDgktNmX3Gu',sultans:'37Tmv4NnfQeb0ZgUC4fOJj',relax:'5u4hhtZ7f4rWkMZEZcTKrH',loco:'0YxQ5bR8jTvOxG06vEmsq3'};
  const dock=document.getElementById('music-dock');
  const dockToggle=document.getElementById('music-toggle');
  const dockMember=document.getElementById('music-member');
  const dockTitle=document.getElementById('music-title');
  const dockArtist=document.getElementById('music-artist');
  const trackBtns=[...dock.querySelectorAll('[data-track]')];
  const slots=[...dock.querySelectorAll('[data-slot]')];
  let loaded=false;
  function loadIframes(){
    if(loaded)return;loaded=true;
    slots.forEach(slot=>{
      const id=TRACKS[slot.dataset.slot];
      const iframe=slot.querySelector('iframe');
      if(!id||!iframe||iframe.src)return;
      iframe.src=`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
    });
  }
  function setActive(key){
    if(!TRACKS[key])return;
    trackBtns.forEach(b=>{const on=b.dataset.track===key;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',on?'true':'false')});
    slots.forEach(s=>s.classList.toggle('is-active',s.dataset.slot===key));
    const btn=trackBtns.find(b=>b.dataset.track===key);
    if(btn){dockTitle.textContent=btn.dataset.title||'';dockArtist.textContent=btn.dataset.artist||'';dockMember.textContent=btn.dataset.member||''}
  }
  dockToggle.addEventListener('click',()=>{
    const collapsed=dock.classList.toggle('is-collapsed');
    dockToggle.setAttribute('aria-expanded',collapsed?'false':'true');
    if(!collapsed)loadIframes();
  });
  trackBtns.forEach(btn=>btn.addEventListener('click',()=>{
    loadIframes();dock.classList.remove('is-collapsed');dockToggle.setAttribute('aria-expanded','true');setActive(btn.dataset.track);
  }));
  dock.addEventListener('pointerenter',loadIframes,{once:true});
  dock.addEventListener('focusin',loadIframes,{once:true});
})();
