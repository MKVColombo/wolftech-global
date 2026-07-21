const boot=document.getElementById('boot'),bar=document.getElementById('bootBar'),count=document.getElementById('bootCount'),status=document.getElementById('bootStatus');
const bootCode=document.querySelector('.boot__code');if(bootCode)bootCode.textContent=('WOLFTECH_SYSTEMS_INIT_  ').repeat(260);
const bootLogRows=[...document.querySelectorAll('#bootLogs p')];
const bootClock=new Date().toLocaleTimeString('en-GB',{hour12:false});
bootLogRows.forEach(row=>row.querySelector('time').textContent='['+bootClock+']');
let progress=0;
const bootStarted=performance.now();
const minimumBootTime=2400;
const bootTimer=document.documentElement.classList.contains('skip-boot')?(boot.remove(),document.body.classList.remove('loading'),0):setInterval(()=>{
  progress=Math.min(100,progress+Math.ceil(Math.random()*5));
  bar.style.width=progress+'%';count.textContent=progress+'%';
  bootLogRows.forEach((row,index)=>row.classList.toggle('shown',progress>=8+(index*17)));
  if(progress>22)status.textContent='ESTABLISHING SECURE UPLINK...';
  if(progress>52)status.textContent='SYNCHRONIZING CORE MODULES...';
  if(progress>82)status.textContent='CALIBRATING INTERFACE...';
  if(progress===100){
    clearInterval(bootTimer);status.textContent='LINK ESTABLISHED';
    const remaining=Math.max(0,minimumBootTime-(performance.now()-bootStarted));
    setTimeout(()=>{try{sessionStorage.setItem('wolfBooted','1')}catch(e){}boot.classList.add('done');document.body.classList.remove('loading');setTimeout(()=>boot.remove(),900)},remaining+250);
  }
},90);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const cursor=document.getElementById('cursor');window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='35px';cursor.style.height='35px'});el.addEventListener('mouseleave',()=>{cursor.style.width='9px';cursor.style.height='9px'})});
document.getElementById('menu').addEventListener('click',()=>document.getElementById('navLinks').classList.toggle('open'));document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));
const latency=document.getElementById('latency');if(latency)setInterval(()=>latency.textContent=String(8+Math.floor(Math.random()*10)).padStart(3,'0')+'ms',1800);
setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')),1400);
const canvas=document.getElementById('matrixCanvas');
if(canvas){const ctx=canvas.getContext('2d');let points=[];const resize=()=>{canvas.width=canvas.clientWidth*devicePixelRatio;canvas.height=canvas.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const count=Math.max(35,Math.floor(canvas.clientWidth/28));points=Array.from({length:count},()=>({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12}))};const draw=()=>{ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);for(let i=0;i<points.length;i++){const p=points[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.clientWidth)p.vx*=-1;if(p.y<0||p.y>canvas.clientHeight)p.vy*=-1;ctx.fillStyle='rgba(148,163,184,.32)';ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,Math.PI*2);ctx.fill();for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<145){ctx.strokeStyle=`rgba(56,189,248,${.07*(1-d/145)})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}requestAnimationFrame(draw)};resize();addEventListener('resize',resize);draw()}
const dialog=document.getElementById('contactDialog');document.getElementById('openContact').addEventListener('click',()=>dialog.showModal());document.getElementById('closeContact').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.getElementById('contactForm').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget,button=form.querySelector('button'),output=document.getElementById('formStatus');button.disabled=true;output.textContent='ENCRYPTING TRANSMISSION...';const payload=Object.fromEntries(new FormData(form));try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error();const data=await response.json();output.textContent=data.message.toUpperCase();form.reset()}catch{output.textContent='SIGNAL FAILED. VERIFY ALL FIELDS AND RETRY.'}finally{button.disabled=false}});
