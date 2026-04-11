/**
 * Contact Form Module
 *
 * Sends messages to thirumalaithiruvasan@gmail.com via Web3Forms.
 *
 * ── One-time setup (2 minutes) ───────────────────────────────────────────────
 *  1. Open https://web3forms.com in your browser
 *  2. Enter "thirumalaithiruvasan@gmail.com" and click "Create Access Key"
 *  3. Check your Gmail inbox for the key (subject: "Your Web3Forms Access Key")
 *  4. Paste the key below, replacing YOUR_WEB3FORMS_ACCESS_KEY
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ContactForm = (() => {
  'use strict';

  // ── Configuration ─────────────────────────────────────────────────────────
  // Key is loaded from assets/js/config.js (gitignored).
  // For GitHub Pages deployment, it is injected via the WEB3FORMS_KEY GitHub Secret.
  const WEB3FORMS_KEY  = (window.SITE_CONFIG && window.SITE_CONFIG.web3formsKey) || '';
  const WEB3FORMS_URL  = 'https://api.web3forms.com/submit';
  const isConfigured   = () => WEB3FORMS_KEY !== '' && WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY';

  // ── Private state ─────────────────────────────────────────────────────────
  let form, submitBtn, loadingEl, errorEl, successEl;

  // ── Public API ────────────────────────────────────────────────────────────
  function init() {
    form = document.getElementById('contact-form');
    if (!form) return;

    submitBtn = form.querySelector('.submit-btn');
    loadingEl = form.querySelector('.loading');
    errorEl   = form.querySelector('.error-message');
    successEl = form.querySelector('.success-message');

    initFloatingLabels();
    form.addEventListener('submit', handleSubmit);
  }

  // ── Floating label effect ─────────────────────────────────────────────────
  // has-value is applied on every keystroke so the label moves the moment
  // the user starts typing (not just when they leave the field).
  function initFloatingLabels() {
    form.querySelectorAll('input, textarea').forEach(input => {
      const sync = () =>
        input.value
          ? input.classList.add('has-value')
          : input.classList.remove('has-value');

      sync(); // preserve autofill on page load
      input.addEventListener('input',  sync);
      input.addEventListener('focus',  () => input.classList.add('focused'));
      input.addEventListener('blur',   () => { input.classList.remove('focused'); sync(); });
    });
  }

  // ── Submission handler ────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();

    const fields = {
      name:    getVal('name'),
      email:   getVal('email'),
      subject: getVal('subject'),
      message: getVal('message'),
    };

    // Client-side validation
    if (Object.values(fields).some(v => !v)) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    if (!isConfigured()) {
      showStatus(
        'Contact form not configured yet. Please email me at thirumalaithiruvasan@gmail.com',
        'error'
      );
      return;
    }

    showStatus('Sending your message\u2026', 'loading');
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('access_key',   WEB3FORMS_KEY);
      payload.append('from_name',    'Portfolio Contact Form');
      payload.append('name',         fields.name);
      payload.append('email',        fields.email);
      payload.append('replyto',      fields.email);
      payload.append('subject',      `Portfolio Contact: ${fields.subject}`);
      payload.append('message',      fields.message);
      // Honeypot — must stay empty; bots fill it and get rejected
      payload.append('botcheck',     '');

      const res = await fetch(WEB3FORMS_URL, { method: 'POST', body: payload });
      const json = await res.json();

      if (json.success) {
        resetForm();
        showStatus("Message sent! I\u2019ll get back to you soon. \u2713", 'success');
      } else {
        throw new Error(json.message ?? 'Submission rejected');
      }
    } catch (err) {
      console.error('[ContactForm]', err);
      showStatus(
        'Could not send your message. Please email me at thirumalaithiruvasan@gmail.com',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── UI helpers ────────────────────────────────────────────────────────────
  function showStatus(message, type) {
    [loadingEl, errorEl, successEl].forEach(el => {
      if (el) el.style.display = 'none';
    });
    const target = { loading: loadingEl, error: errorEl, success: successEl }[type];
    if (target) {
      target.textContent = message;
      target.style.display = 'block';
    }
    if (type === 'success' || type === 'error') {
      setTimeout(() => { if (target) target.style.display = 'none'; }, 6000);
    }
  }

  function setSubmitting(sending) {
    if (!submitBtn) return;
    submitBtn.disabled    = sending;
    submitBtn.textContent = sending ? 'Sending\u2026' : 'Send Message';
  }

  function resetForm() {
    form.reset();
    form.querySelectorAll('input, textarea').forEach(el =>
      el.classList.remove('has-value', 'focused')
    );
  }

  function getVal(id) {
    return (document.getElementById(id)?.value ?? '').trim();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', ContactForm.init);
