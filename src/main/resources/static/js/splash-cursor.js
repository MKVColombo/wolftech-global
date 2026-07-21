(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'splashCursor'; canvas.setAttribute('aria-hidden', 'true'); document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha:true }); if (!ctx) return;
  const bolts = [], sparks = [], rings = [];
  let width, height, dpr, frame = 0, last = null;

  function resize() {
    width = innerWidth; height = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function createBolt(x, y, dx, dy) {
    const speed = Math.hypot(dx, dy); if (speed < 2) return;
    const length = Math.min(58, 12 + speed * .92);
    const angle = Math.atan2(dy, dx) + Math.PI;
    const segments = Math.max(4, Math.min(8, Math.round(length / 8)));
    const points = [{x,y}];
    for (let i = 1; i <= segments; i++) {
      const progress = i / segments;
      const baseX = x + Math.cos(angle) * length * progress;
      const baseY = y + Math.sin(angle) * length * progress;
      const jag = i === segments ? 0 : (Math.random() - .5) * Math.min(11, 3 + speed * .1);
      points.push({x:baseX + Math.cos(angle + Math.PI/2) * jag,y:baseY + Math.sin(angle + Math.PI/2) * jag});
    }
    bolts.push({points,born:performance.now(),duration:105 + Math.min(70,speed),speed});
    if (bolts.length > 7) bolts.shift();
    if (speed > 18) for(let i=0;i<Math.min(3,Math.floor(speed/20));i++) sparks.push({x,y,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,life:1});
  }
  function move(x,y) {
    if (last) createBolt(x,y,x-last.x,y-last.y);
    last={x,y};
  }
  function strokeBolt(points, alpha) {
    ctx.beginPath(); ctx.moveTo(points[0].x,points[0].y);
    for(let i=1;i<points.length;i++) ctx.lineTo(points[i].x,points[i].y);
    ctx.strokeStyle=`rgba(85,229,247,${alpha*.2})`;ctx.lineWidth=6.2;ctx.stroke();
    ctx.strokeStyle=`rgba(85,229,247,${alpha*.66})`;ctx.lineWidth=1.8;ctx.stroke();
    ctx.strokeStyle=`rgba(232,254,255,${alpha})`;ctx.lineWidth=.55;ctx.stroke();
  }
  function render(now) {
    ctx.clearRect(0,0,width,height);ctx.lineCap='round';ctx.lineJoin='miter';ctx.globalCompositeOperation='lighter';
    for(let i=bolts.length-1;i>=0;i--){
      const bolt=bolts[i],age=(now-bolt.born)/bolt.duration;
      if(age>=1){bolts.splice(i,1);continue}
      const alpha=Math.pow(1-age,1.5);strokeBolt(bolt.points,alpha);
      if(bolt.speed>20&&bolt.points.length>4){
        const n=bolt.points[Math.floor(bolt.points.length*.48)],p=bolt.points[Math.floor(bolt.points.length*.72)];
        const dx=p.x-n.x,dy=p.y-n.y,len=Math.hypot(dx,dy)||1,side=Math.sin(bolt.born)*8;
        ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(n.x-dy/len*side+dx/len*5,n.y+dx/len*side+dy/len*5);
        ctx.strokeStyle=`rgba(134,242,255,${alpha*.55})`;ctx.lineWidth=.55;ctx.stroke();
      }
    }
    for(let i=sparks.length-1;i>=0;i--){const s=sparks[i];s.x+=s.vx;s.y+=s.vy;s.vx*=.92;s.vy*=.92;s.life-=.08;if(s.life<=0){sparks.splice(i,1);continue}ctx.fillStyle=`rgba(115,240,255,${s.life*.7})`;ctx.fillRect(s.x,s.y,1,1)}
    for(let i=rings.length-1;i>=0;i--){const r=rings[i],age=(now-r.born)/420;if(age>=1){rings.splice(i,1);continue}ctx.beginPath();ctx.arc(r.x,r.y,5+age*24,0,Math.PI*2);ctx.strokeStyle=`rgba(85,229,247,${(1-age)*.45})`;ctx.lineWidth=.7;ctx.stroke()}
    ctx.globalCompositeOperation='source-over';frame=requestAnimationFrame(render);
  }
  addEventListener('pointermove',e=>move(e.clientX,e.clientY),{passive:true});
  addEventListener('pointerdown',e=>{move(e.clientX,e.clientY);rings.push({x:e.clientX,y:e.clientY,born:performance.now()})},{passive:true});
  addEventListener('pointerleave',()=>last=null);addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else if(!frame)frame=requestAnimationFrame(render)});
  resize();frame=requestAnimationFrame(render);
})();
