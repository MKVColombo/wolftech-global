(() => {
  const form = document.querySelector('#infoContactForm');
  if (!form) return;
  const output = document.querySelector('#infoFormStatus');
  form.addEventListener('submit', async event => {
    event.preventDefault(); const button = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form));
    const prefix = [data.context, data.organization].filter(Boolean).join(' / ');
    const payload = { name: data.name, email: data.email, message: prefix ? `[${prefix}] ${data.message}` : data.message };
    button.disabled = true; output.dataset.state = ''; output.textContent = 'ENCRYPTING TRANSMISSION...';
    try { const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); const result = await response.json().catch(()=>({})); if(!response.ok) throw new Error(result.message || 'Check all required fields.'); output.dataset.state='success'; output.textContent=result.message; form.reset(); }
    catch(error){ output.dataset.state='error'; output.textContent=error.message || 'Signal failed. Please retry.'; }
    finally{ button.disabled=false; }
  });
})();
