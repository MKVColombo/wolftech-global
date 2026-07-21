(() => {
  const dialog = document.querySelector('#applicationDialog');
  const form = document.querySelector('#applicationForm');
  if (!dialog || !form) return;

  const position = document.querySelector('#positionInput');
  const positionLabel = document.querySelector('#applicationPosition');
  const status = dialog.querySelector('.application-status');
  const submit = dialog.querySelector('.form-submit');
  const fileInput = form.querySelector('[name="resume"]');
  const fileLabel = dialog.querySelector('.file-field b');

  document.querySelectorAll('.apply-trigger').forEach(button => button.addEventListener('click', () => {
    position.value = button.dataset.position;
    positionLabel.textContent = button.dataset.position;
    status.textContent = '';
    dialog.showModal();
  }));
  dialog.querySelector('.dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  fileInput.addEventListener('change', () => { fileLabel.textContent = fileInput.files[0]?.name || 'CHOOSE FILE'; });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const file = fileInput.files[0];
    if (!file || file.size > 5 * 1024 * 1024) {
      status.textContent = 'Attach a CV smaller than 5 MB.'; status.dataset.state = 'error'; return;
    }
    submit.disabled = true; submit.firstChild.textContent = 'TRANSMITTING... ';
    status.textContent = '';
    try {
      const response = await fetch('/api/applications', { method: 'POST', body: new FormData(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Transmission failed. Check the form and retry.');
      status.dataset.state = 'success'; status.textContent = `${data.message} Reference: ${data.reference}`;
      form.reset(); fileLabel.textContent = 'CHOOSE FILE';
    } catch (error) {
      status.dataset.state = 'error'; status.textContent = error.message;
    } finally {
      submit.disabled = false; submit.firstChild.textContent = 'TRANSMIT APPLICATION ';
    }
  });
})();
