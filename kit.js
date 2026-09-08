// ---- Shared motion kit (GSAP) ----
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const SVGNS='http://www.w3.org/2000/svg';
// background wave line-art (BillsToPay style), drifts for the whole film
function mountWave(){ const st=$('#stage'); const w=document.createElementNS(SVGNS,'svg'); w.setAttribute('id','wave'); w.setAttribute('viewBox','0 0 2400 420');
  w.innerHTML='<defs><linearGradient id="gWave" x1="0" x2="1"><stop offset="0" stop-color="#2E3F8C"/><stop offset="1" stop-color="#B4303E"/></linearGradient></defs><path d="M0,300 C300,120 500,420 800,260 S1300,80 1600,260 S2100,420 2400,240" fill="none" stroke="url(#gWave)" stroke-width="2.5" opacity=".5"/><path d="M0,340 C320,180 520,440 820,300 S1320,120 1620,300 S2120,440 2400,280" fill="none" stroke="url(#gWave)" stroke-width="1.5" opacity=".28"/>';
  st.insertBefore(w, st.firstChild); }
const KITCSS=`#wave{position:absolute;left:0;bottom:-40px;width:2400px;height:420px;pointer-events:none;z-index:0;}
.scene{z-index:1;} .rl{display:block;overflow:hidden;padding-bottom:.1em;margin-bottom:-.1em;} .rl>span{display:block;}
.typing{display:inline-flex;gap:5px;align-items:center;height:16px;} .typing i{width:7px;height:7px;border-radius:50%;background:#9AA3B8;display:block;}`;
function mountKit(){ const s=document.createElement('style'); s.textContent=KITCSS; document.head.appendChild(s); mountWave(); }
function reveal(tl, sel, at, s=0.12){ tl.fromTo(sel,{yPercent:115,opacity:0},{yPercent:0,opacity:1,duration:0.9,ease:'power3.out',stagger:s},at); }
function pop(tl, sel, at, o={}){ tl.fromTo(sel,{opacity:0,y:o.y??70,scale:o.scale??0.9,rotation:o.rot??-1.5},{opacity:1,y:0,scale:1,rotation:0,duration:o.d??0.8,ease:o.ease||'back.out(1.4)',stagger:o.s??0.12},at); }
function out(tl, sel, at, d=0.45){ tl.to(sel,{opacity:0,y:-50,scale:0.98,duration:d,ease:'power2.in'},at); }
function float(tl, sel, at, dur, amp=7){ const reps=Math.max(1,Math.floor(dur/1.6)); tl.to(sel,{y:-amp,duration:0.8,yoyo:true,repeat:reps*2-1,ease:'sine.inOut'},at); }
function count(tl, el, to, at, dur=1.4, fmt=(v)=>Math.round(v).toLocaleString('en-IN'), from=0){ const o={v:from}; tl.to(o,{v:to,duration:dur,ease:'power2.out',onUpdate:()=>{ el.textContent=fmt(o.v); }},at); }
function prepDraw(sel){ $$(sel).forEach(el=>{ const L=el.getTotalLength(); el.style.strokeDasharray=L; el.style.strokeDashoffset=L; }); }
function draw(tl, sel, at, dur=1.0, s=0.05){ tl.to(sel,{strokeDashoffset:0,duration:dur,ease:'power2.inOut',stagger:s},at); }
function stamp(tl, sel, at, target){ tl.fromTo(sel,{opacity:0,scale:2.4},{opacity:1,scale:1,duration:0.4,ease:'power4.in'},at); if(target) tl.to(target,{x:5,duration:0.06,yoyo:true,repeat:5,ease:'none'},at+0.4); }
function typeIn(tl, el, text, at, dur=1.4){ const o={n:0}; tl.to(o,{n:text.length,duration:dur,ease:'none',onUpdate:()=>{ el.textContent=text.slice(0,Math.round(o.n)); }},at); }
function typing(tl, sel, at, dur=0.9){ tl.fromTo(sel,{opacity:0},{opacity:1,duration:0.2},at); $$(sel+' i').forEach((d,i)=>tl.fromTo(d,{y:0},{y:-4,duration:0.28,yoyo:true,repeat:Math.floor(dur/0.28),ease:'sine.inOut'},at+i*0.1)); tl.to(sel,{opacity:0,duration:0.15},at+dur); }
