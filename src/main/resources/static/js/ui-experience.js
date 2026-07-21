(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('main>section').forEach((section,index)=>{
    if(index===0)return;
    const rail=document.createElement('i');
    rail.className='section-portal';
    rail.setAttribute('aria-hidden','true');
    section.prepend(rail);
  });
  if(reduced||matchMedia('(pointer: coarse)').matches)return;
  const cards=document.querySelectorAll('.module,.capabilities article,.job-card,.info-panel,.transmission-panel,.module-cta,.radar-invite');
  cards.forEach(card=>{
    card.classList.add('ui-tilt');
    const glow=document.createElement('i');glow.className='ui-local-glow';glow.setAttribute('aria-hidden','true');card.prepend(glow);
    let frame=0,rx=0,ry=0,tx=50,ty=50;
    const paint=()=>{card.style.setProperty('--ui-rx',rx.toFixed(2)+'deg');card.style.setProperty('--ui-ry',ry.toFixed(2)+'deg');card.style.setProperty('--ui-x',tx.toFixed(1)+'%');card.style.setProperty('--ui-y',ty.toFixed(1)+'%');frame=0};
    card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;tx=x*100;ty=y*100;rx=(.5-y)*2.4;ry=(x-.5)*3;if(!frame)frame=requestAnimationFrame(paint)},{passive:true});
    card.addEventListener('pointerenter',()=>card.classList.add('ui-tilt--active'),{passive:true});
    card.addEventListener('pointerleave',()=>{rx=ry=0;tx=ty=50;card.classList.remove('ui-tilt--active');if(!frame)frame=requestAnimationFrame(paint)},{passive:true});
  });
})();
