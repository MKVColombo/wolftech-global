(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');
  const sections = Array.from(document.querySelectorAll('main > section'));

  if (!sections.length || reducedMotion.matches) return;

  document.documentElement.classList.add('depth-scroll-ready');
  sections.forEach((section, index) => {
    section.classList.add('depth-section');
    section.style.setProperty('--depth-index', index);
  });

  let frame = 0;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function render() {
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const strength = coarsePointer.matches ? 0.68 : 1;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      let phase = 0;

      if (rect.top > viewport * 0.08) {
        phase = clamp((rect.top - viewport * 0.08) / (viewport * 0.92), 0, 1);
      } else if (rect.bottom < viewport * 0.92) {
        phase = -clamp((viewport * 0.92 - rect.bottom) / (viewport * 0.92), 0, 1);
      }

      const distance = Math.abs(phase);
      const eased = distance * distance * (3 - 2 * distance);
      const direction = phase < 0 ? -1 : 1;
      const exiting = phase < 0;

      section.style.setProperty('--depth-scale', '1');
      section.style.setProperty('--depth-y', `${Math.round((exiting ? -eased * 6 : direction * eased * 18) * strength)}px`);
      section.style.setProperty('--depth-z', '0px');
      section.style.setProperty('--depth-rotate', '0deg');
      section.style.setProperty('--depth-opacity', '1');
      section.style.setProperty('--depth-blur', '0px');
      section.style.setProperty('--depth-radius', exiting ? '0px' : `${(eased * 22 * strength).toFixed(2)}px`);
      section.classList.toggle('depth-active', distance < 0.14);
    });

    frame = 0;
  }

  function requestRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  addEventListener('load', requestRender, { once: true });
  render();
})();
