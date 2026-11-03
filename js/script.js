// Menu toggle
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
if(menu&&nav){menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')})}
// Sample deliverables tabs
const tabs=[...document.querySelectorAll('.tabs button')],panels=[...document.querySelectorAll('.panel')];
function show(id){tabs.forEach(t=>t.setAttribute('aria-selected',t.dataset.p===id));panels.forEach(p=>p.hidden=p.id!==id)}
tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.p)));if(tabs.length)show(tabs[0].dataset.p);
// Chart (FICTIONAL data)
function chart(id,labels,a,b,la,lb){const el=document.getElementById(id);if(!el)return;const m=Math.max(...a,...b);
 el.innerHTML=labels.map((l,i)=>`<div class="bar"><div class="pair"><i style="height:${a[i]/m*100}%" title="${la}: ${a[i]}"></i><i class="e" style="height:${b[i]/m*100}%" title="${lb}: ${b[i]}"></i></div>${l}</div>`).join('');
 el.setAttribute('aria-label',labels.map((l,i)=>`${l}: ${la} ${a[i]}, ${lb} ${b[i]}`).join('; '))}
chart('c1',['Jan','Feb','Mar'],[18000,20000,22000],[12000,12500,13000],'Revenue','Expenses');
// Scroll effect: each block rises into place, following the scroll position
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var els=[].slice.call(document.querySelectorAll('main section>*')).filter(function(e){return e.tagName!=='STYLE'&&e.tagName!=='SCRIPT'});
var ty=els.map(function(){return 0});
els.forEach(function(el){el.style.transition='box-shadow .22s ease,border-color .22s ease'});
var busy=false;
function run(){busy=false;var H=innerHeight,a=H*.96,b=H*.35;
 for(var i=0;i<els.length;i++){var el=els[i],r=el.getBoundingClientRect(),top=r.top-ty[i];
  var p=Math.min(1,Math.max(0,(a-top)/(a-b)));var y=(1-p)*220;ty[i]=y;
  el.style.opacity=Math.min(1,p*3);el.style.transform='translateY('+y+'px)'}}
function req(){if(!busy){busy=true;requestAnimationFrame(run)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);addEventListener('load',req);run();
})();
// Signature line: fills the teal strip, leaving about half an inch each side
(function(){
var f=document.getElementById('sigfoot'),t=document.getElementById('sigtxt2');
if(!f||!t)return;
function fit(){
var small=innerWidth<700;
f.style.paddingLeft=f.style.paddingRight=small?'24px':'48px';
if(small){t.style.whiteSpace='normal';t.style.fontSize='1.5rem';return}
t.style.whiteSpace='nowrap';t.style.fontSize='100px';
var w=f.clientWidth-96,n=t.scrollWidth;
if(w>0&&n>0)t.style.fontSize=Math.max(16,Math.min(Math.floor(100*w/n*.99),80))+'px'}
fit();addEventListener('resize',fit);addEventListener('load',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();
