// Menu toggle
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A')nav.classList.remove('open')});
// Project tabs
const tabs=[...document.querySelectorAll('.tabs button')],panels=[...document.querySelectorAll('.panel')];
function show(id){tabs.forEach(t=>t.setAttribute('aria-selected',t.dataset.p===id));panels.forEach(p=>p.hidden=p.id!==id)}
tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.p)));show('p1');
// Charts (FICTIONAL data)
function chart(id,labels,a,b,la,lb){const el=document.getElementById(id),m=Math.max(...a,...b);
 el.innerHTML=labels.map((l,i)=>`<div class="bar"><div class="pair"><i style="height:${a[i]/m*100}%" title="${la}: ${a[i]}"></i><i class="e" style="height:${b[i]/m*100}%" title="${lb}: ${b[i]}"></i></div>${l}</div>`).join('');
 el.setAttribute('aria-label',labels.map((l,i)=>`${l}: ${la} ${a[i]}, ${lb} ${b[i]}`).join('; '))}
chart('c1',['Jan','Feb','Mar'],[18000,20000,22000],[12000,12500,13000],'Revenue','Expenses');
chart('c2',['Jan','Feb','Mar'],[4500,4500,3100],[1500,1700,1300],'Rent collected','Expenses');
