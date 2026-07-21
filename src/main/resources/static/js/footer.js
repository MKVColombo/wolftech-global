(() => {
  const footer = document.querySelector('footer'); if (!footer || footer.dataset.enhanced) return;
  footer.dataset.enhanced = 'true'; footer.classList.add('footer-complete');
  const brand = footer.querySelector('.brand');
  if (brand) brand.insertAdjacentHTML('afterend','<div class="footer-intro"><p>Engineering future-proof digital infrastructures for global industry leaders.</p><div class="footer-social"><a href="#" aria-label="GitHub">⌘</a><a href="#" aria-label="X / Twitter">𝕏</a><a href="#" aria-label="LinkedIn">in</a><a href="mailto:info@wolftechglobal.com" aria-label="Email WolfTech">✉</a></div></div>');
  Array.from(footer.children).forEach(element => {
    const heading = element.querySelector(':scope > span');
    if (heading?.textContent.trim() === 'SERVICES') element.classList.add('footer-links--services');
    if (heading?.textContent.trim() === 'COMPANY') element.classList.add('footer-links--company');
  });
  const copyright = footer.querySelector('.copyright');
  if (copyright) copyright.insertAdjacentHTML('beforebegin','<div class="footer-ops"><article><small>GLOBAL LATENCY</small><strong id="footerLatency">12ms</strong><i></i></article><article><small>SYSTEM HQ</small><b>6.9082° N<br>79.8505° E</b><a href="https://www.google.com/maps?q=6.9082,79.8505" target="_blank" rel="noopener">OPEN RADAR MAP ↗</a></article></div>');
  const latency = document.querySelector('#footerLatency'); setInterval(()=>{latency.textContent=(9+Math.floor(Math.random()*7))+'ms'},2200);
})();
