(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reading progress and cinematic route transition.
  const progress = document.createElement('i');
  progress.className = 'site-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const curtain = document.createElement('div');
  curtain.className = 'route-curtain';
  curtain.innerHTML = '<i></i><span>WOLFTECH // LINKING</span>';
  curtain.setAttribute('aria-hidden', 'true');
  document.body.append(curtain);
  const updateProgress = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--read', `${range > 0 ? Math.min(100, scrollY / range * 100) : 0}%`);
  };
  addEventListener('scroll', updateProgress, {passive:true}); updateProgress();
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    curtain.classList.add('is-routing');
    setTimeout(() => location.href = url.href, reduced ? 0 : 360);
  });
  addEventListener('pageshow', () => curtain.classList.remove('is-routing'));

  // System Explorer: one compact map for every primary capability.
  const nav = document.querySelector('.nav');
  const explorer = document.createElement('dialog');
  explorer.className = 'system-explorer';
  explorer.innerHTML = `<button class="explorer-close" aria-label="Close system explorer">×</button>
    <div class="explorer-copy"><span>WOLFTECH // SYSTEM MAP</span><h2>Choose a<br><em>signal path.</em></h2><p>Four disciplines. One connected digital system.</p></div>
    <div class="explorer-map" aria-label="Service map"><i class="orbit o1"></i><i class="orbit o2"></i>
      <a href="/development" style="--x:16%;--y:22%"><b>01</b><strong>DEVELOPMENT</strong><small>Software systems</small></a>
      <a href="/voip" style="--x:72%;--y:15%"><b>02</b><strong>VOIP</strong><small>Connected voice</small></a>
      <a href="/arts" style="--x:64%;--y:69%"><b>03</b><strong>ARTS</strong><small>Visual worlds</small></a>
      <a href="/marketing" style="--x:10%;--y:72%"><b>04</b><strong>MARKETING</strong><small>Growth signals</small></a><span class="explorer-core">W</span>
    </div>`;
  document.body.append(explorer);
  if (nav) {
    const trigger = document.createElement('button');
    trigger.className = 'explorer-trigger'; trigger.textContent = 'SYSTEMS';
    trigger.setAttribute('aria-label','Open system explorer');
    const connect = nav.querySelector('.connect'); nav.insertBefore(trigger, connect || null);
    trigger.addEventListener('click', () => explorer.showModal());
  }
  explorer.querySelector('.explorer-close').addEventListener('click', () => explorer.close());
  explorer.addEventListener('click', e => { if (e.target === explorer) explorer.close(); });

  // Editorial motion type and case-study expansion.
  document.querySelectorAll('section h2, section h3, .module-hero h1').forEach(h => h.classList.add('kinetic-title'));
  const observer = new IntersectionObserver(entries => entries.forEach(x => {
    x.target.classList.toggle('kinetic-in', x.isIntersecting);
  }), {threshold:.18, rootMargin:'0px 0px -5%'});
  document.querySelectorAll('.kinetic-title, main>section').forEach(el => observer.observe(el));
  document.querySelectorAll('.case-card').forEach(card => {
    const toggle = () => { const on = card.classList.contains('is-active'); document.querySelectorAll('.case-card').forEach(x => x.classList.remove('is-active')); if (!on) card.classList.add('is-active'); };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  // Form completion meter, local draft recovery, and transmission receipt.
  document.querySelectorAll('#contactForm,#infoContactForm,.career-dialog form').forEach((form, formIndex) => {
    const meter = document.createElement('div'); meter.className = 'form-meter'; meter.innerHTML = '<i></i><span>0% SIGNAL READY</span>';
    form.prepend(meter);
    const fields = [...form.querySelectorAll('input:not([type=file]):not([type=hidden]),textarea,select')];
    const required = fields.filter(f => f.required); const key = `wolfDraft:${location.pathname}:${form.id || formIndex}`;
    try { const draft = JSON.parse(localStorage.getItem(key) || '{}'); fields.forEach(f => { if (draft[f.name] && !f.value) f.value = draft[f.name]; }); } catch (_) {}
    const update = () => {
      const pool = required.length ? required : fields;
      const pct = pool.length ? Math.round(pool.filter(f => f.type === 'checkbox' ? f.checked : f.value.trim()).length / pool.length * 100) : 100;
      meter.style.setProperty('--form-progress', pct + '%'); meter.querySelector('span').textContent = `${pct}% SIGNAL READY`;
      const draft = {}; fields.forEach(f => draft[f.name] = f.type === 'checkbox' ? (f.checked ? 'yes' : '') : f.value);
      try { localStorage.setItem(key, JSON.stringify(draft)); } catch (_) {}
    };
    form.addEventListener('input', update); form.addEventListener('change', update); update();
    form.addEventListener('submit', () => setTimeout(() => { if (form.querySelector('.success') || form.dataset.sent === 'true') localStorage.removeItem(key); }, 900));
  });
  const statusObserver = new MutationObserver(records => records.forEach(r => {
    const el = r.target.nodeType === 1 ? r.target : r.target.parentElement;
    if (el && /success|sent|transmit/i.test(el.textContent) && !/REF WT-/.test(el.textContent)) el.append(` // REF WT-${Date.now().toString(36).toUpperCase().slice(-6)}`);
  }));
  document.querySelectorAll('[id*=status],[class*=status],.form-message').forEach(el => statusObserver.observe(el,{childList:true,subtree:true,characterData:true}));

  // Optional, deliberately quiet interface sound; preference is remembered.
  if (nav) {
    const sound = document.createElement('button'); sound.className = 'sound-toggle'; sound.setAttribute('aria-label','Toggle interface sound');
    let enabled = localStorage.getItem('wolfSound') === 'on';
    const paint = () => { sound.textContent = enabled ? 'SOUND ON' : 'SOUND OFF'; sound.classList.toggle('is-on',enabled); }; paint();
    let audio;
    const tick = () => { if (!enabled) return; audio ||= new (window.AudioContext || window.webkitAudioContext)(); const o=audio.createOscillator(),g=audio.createGain(); o.frequency.value=880; g.gain.setValueAtTime(.018,audio.currentTime); g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.045); o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime+.05); };
    sound.addEventListener('click', () => { enabled=!enabled; localStorage.setItem('wolfSound',enabled?'on':'off'); paint(); tick(); });
    nav.insertBefore(sound, nav.querySelector('.theme'));
    document.addEventListener('pointerdown', e => { if (e.target.closest('a,.btn,button') && e.target !== sound) tick(); }, {passive:true});
  }
  root.classList.add('experience-ready');
})();
