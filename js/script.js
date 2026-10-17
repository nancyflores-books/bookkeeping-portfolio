// Menu toggle
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')});
// Project tabs
const tabs=[...document.querySelectorAll('.tabs button')],panels=[...document.querySelectorAll('.panel')];
function show(id){tabs.forEach(t=>t.setAttribute('aria-selected',t.dataset.p===id));panels.forEach(p=>p.hidden=p.id!==id)}
tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.p)));show('p1');
// Chart (FICTIONAL data)
function chart(id,labels,a,b,la,lb){const el=document.getElementById(id);if(!el)return;const m=Math.max(...a,...b);
 el.innerHTML=labels.map((l,i)=>`<div class="bar"><div class="pair"><i style="height:${a[i]/m*100}%" title="${la}: ${a[i]}"></i><i class="e" style="height:${b[i]/m*100}%" title="${lb}: ${b[i]}"></i></div>${l}</div>`).join('');
 el.setAttribute('aria-label',labels.map((l,i)=>`${l}: ${la} ${a[i]}, ${lb} ${b[i]}`).join('; '))}
chart('c1',['Jan','Feb','Mar'],[18000,20000,22000],[12000,12500,13000],'Revenue','Expenses');
// Click-to-enlarge for case study screenshots and certificates
(function(){
var css='.lb-wrap{position:relative}.lb-wrap img{cursor:zoom-in;transition:box-shadow .25s ease}.lb-wrap:hover img{box-shadow:0 0 24px rgba(242,169,59,.6)}.lb-badge{position:absolute;right:10px;bottom:10px;background:#374f59;color:#f2eeca;font:.75rem system-ui;padding:5px 11px;border-radius:99px;pointer-events:none}'+
'#lb{position:fixed;inset:0;z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:rgba(55,79,89,.94);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s}#lb.open{opacity:1;visibility:visible}'+
'#lb img{max-width:92vw;max-height:78vh;background:#fff;border:6px solid #f2eeca;border-radius:12px;box-shadow:-14px 14px 0 #F2A93B;transform:scale(.9);transition:transform .35s cubic-bezier(.2,.8,.2,1)}#lb.open img{transform:scale(1)}'+
'#lb p{margin:0;color:#f2eeca;font:.9rem system-ui;max-width:80vw;text-align:center}#lb button{position:absolute;top:16px;right:20px;background:#F2A93B;color:#374f59;border:0;border-radius:99px;font:700 .9rem system-ui;padding:10px 18px;cursor:pointer}'+
'@media(prefers-reduced-motion:reduce){#lb,#lb img,.lb-wrap img{transition:none}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Enlarged image');
lb.innerHTML='<button type="button">Close ✕</button><img alt=""><p></p>';
document.body.appendChild(lb);
var big=lb.querySelector('img'),cap=lb.querySelector('p'),x=lb.querySelector('button'),last=null;
function open(img){last=img;big.src=img.src;big.alt=img.alt;cap.textContent=img.alt;lb.classList.add('open');document.body.style.overflow='hidden';x.focus()}
function close(){lb.classList.remove('open');document.body.style.overflow='';if(last)last.focus()}
document.querySelectorAll('.cs img,.cg-i img').forEach(function(img){
 var w=document.createElement('div');w.className='lb-wrap';img.parentNode.insertBefore(w,img);w.appendChild(img);
 var b=document.createElement('span');b.className='lb-badge';b.textContent='Click to enlarge';w.appendChild(b);
 img.tabIndex=0;img.setAttribute('role','button');
 img.addEventListener('click',function(){open(img)});
 img.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img)}});
});
lb.addEventListener('click',function(e){if(e.target!==big)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))close()});
})();
// Scroll credits effect: items rise into place, following the scroll position
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var st=document.createElement('style');
st.textContent='main .cs:hover{box-shadow:-10px 10px 0 #F2A93B,0 0 30px rgba(242,169,59,.5)}main .cg-i:hover{box-shadow:-8px 8px 0 #F2A93B,0 0 26px rgba(242,169,59,.5)}';
document.head.appendChild(st);
var sel='.hero>*,main section>h2,main section>h3,main section>p,main section>.eb,main section>.tabs,main section>.tw,main section>.panel,main section>ol,main section>a,main section>.note,main section>.why,.ab-stats>div,.ab-cols>div,.sv-card,.tl-card,.cs,.ce,.cg-i,.st-row,.ct-card,.flow>li,footer';
var els=[].slice.call(document.querySelectorAll(sel)),ty=els.map(function(){return 0}),off=els.map(function(_,i){return (i%4)*28});
els.forEach(function(el){el.style.transition='box-shadow .22s ease,border-color .22s ease'});
var busy=false;
function run(){busy=false;var H=innerHeight,a=H*.96,b=H*.6;
 for(var i=0;i<els.length;i++){var el=els[i],r=el.getBoundingClientRect(),top=r.top-ty[i]+off[i];
  var p=Math.min(1,Math.max(0,(a-top)/(a-b)));var y=(1-p)*80;ty[i]=y;
  el.style.opacity=p;el.style.transform='translateY('+y+'px)'}}
function req(){if(!busy){busy=true;requestAnimationFrame(run)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);run();
})();
