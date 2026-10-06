'use strict';
(() => {
  const config = window.SITE_CONFIG;
  const params = new URLSearchParams(location.search);
  function validate(field) {
    const value = field.value.trim();
    let message = '';
    if (field.required && !value) message = 'Please complete this field.';
    else if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid email address.';
    else if (value && field.name === 'phone' && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) message = 'Enter a phone number with 7–15 digits.';
    else if (value && field.name === 'pincode' && !/^\d{6}$/.test(value)) message = 'Enter a 6-digit Indian pincode.';
    else if (value && field.name === 'message' && value.length < 10) message = 'Please enter at least 10 characters.';
    else if (value && field.maxLength > 0 && value.length > field.maxLength) message = `Use no more than ${field.maxLength} characters.`;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(`${field.id}-error`).textContent = message;
    return !message;
  }
  document.querySelectorAll('[data-enquiry-form]').forEach(form => {
    const fields = [...form.querySelectorAll('.form-field input, .form-field select, .form-field textarea')];
    const select = form.elements.enquiry_type;
    if (select && [...select.options].some(option => option.value === params.get('enquiry'))) select.value = params.get('enquiry');
    if (params.has('product') && form.elements.message) form.elements.message.value = `I would like a quote for ${params.get('product').slice(0, 100)}. `;
    fields.forEach(field => {
      field.addEventListener('blur', () => { if (field.value || form.dataset.attempted) validate(field); });
      field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.dataset.sending) return;
      form.dataset.attempted = 'true';
      const results = fields.map(validate);
      const status = form.querySelector('.form-status');
      status.className = 'form-status';
      if (results.includes(false)) { status.textContent = 'Please check the highlighted fields.'; status.classList.add('error'); fields[results.indexOf(false)].focus(); return; }
      if (form.elements.website.value) return;
      if (!config.formEndpoint) { status.textContent = 'Your details are valid. This demo form is not connected to a submission service, so nothing has been sent.'; status.focus(); return; }
      let endpoint;
      try {
        endpoint = new URL(config.formEndpoint);
        const allowed = config.formProvider === 'web3forms' ? endpoint.origin === 'https://api.web3forms.com' && endpoint.pathname === '/submit' : endpoint.origin === 'https://formspree.io' && /^\/f\/[a-zA-Z0-9]+$/.test(endpoint.pathname);
        if (endpoint.protocol !== 'https:' || !allowed || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) throw new Error('endpoint');
        if (config.formProvider === 'web3forms' && !config.web3FormsAccessKey) throw new Error('key');
      } catch { status.textContent = 'The enquiry service needs configuration. Please use the company’s verified contact details.'; status.classList.add('error'); return; }
      const button = form.querySelector('button[type="submit"]');
      const label = button.innerHTML;
      form.dataset.sending = 'true'; button.disabled = true; button.textContent = 'Sending…'; status.textContent = 'Submitting your enquiry securely…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const data = new FormData(form);
        data.delete('website');
        if (config.formProvider === 'web3forms') data.append('access_key', config.web3FormsAccessKey);
        const response = await fetch(endpoint.href, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal, credentials: 'omit' });
        const result = await response.json();
        if (!response.ok || (config.formProvider === 'web3forms' ? result.success !== true : result.ok !== true)) throw new Error('submission');
        form.reset(); form.removeAttribute('data-attempted'); fields.forEach(field => { field.removeAttribute('aria-invalid'); document.getElementById(`${field.id}-error`).textContent = ''; });
        status.textContent = 'Thank you. Your enquiry has been sent successfully.'; status.classList.add('success');
      } catch { status.textContent = 'Your enquiry could not be confirmed. Your details are still here; please try again or use the company’s verified contact details.'; status.classList.add('error'); }
      finally { clearTimeout(timeout); delete form.dataset.sending; button.disabled = false; button.innerHTML = label; status.focus(); }
    });
  });
})();
