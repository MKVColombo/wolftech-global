(()=>{
  const hero=document.querySelector('.hero');
  const media=hero&&hero.querySelector('.hero-media');
  if(!hero||!media||matchMedia('(prefers-reduced-motion: reduce)').matches||matchMedia('(pointer: coarse)').matches)return;
  let targetX=0,targetY=0,currentX=0,currentY=0,frame=0;
  const render=()=>{
    currentX+=(targetX-currentX)*.075;
    currentY+=(targetY-currentY)*.075;
    media.style.setProperty('--hero-px-a',(currentX*26).toFixed(2)+'px');
    media.style.setProperty('--hero-py-a',(currentY*18).toFixed(2)+'px');
    media.style.setProperty('--hero-px-b',(-currentX*38).toFixed(2)+'px');
    media.style.setProperty('--hero-py-b',(-currentY*25).toFixed(2)+'px');
    media.style.setProperty('--hero-rx',(-currentY*3.2).toFixed(2)+'deg');
    media.style.setProperty('--hero-ry',(currentX*4.5).toFixed(2)+'deg');
    media.style.setProperty('--hero-rx-b',(currentY*2.4).toFixed(2)+'deg');
    media.style.setProperty('--hero-ry-b',(-currentX*3.4).toFixed(2)+'deg');
    if(Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001)frame=requestAnimationFrame(render);else frame=0;
  };
  const wake=()=>{if(!frame)frame=requestAnimationFrame(render)};
  hero.addEventListener('pointermove',event=>{
    const rect=hero.getBoundingClientRect();
    targetX=Math.max(-1,Math.min(1,((event.clientX-rect.left)/rect.width-.5)*2));
    targetY=Math.max(-1,Math.min(1,((event.clientY-rect.top)/rect.height-.5)*2));
    wake();
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{targetX=0;targetY=0;wake()},{passive:true});
})();
