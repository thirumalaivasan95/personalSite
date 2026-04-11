/**
 * Contact Form Module — Formspree delivery
 *
 * ── One-time setup (~3 minutes) ──────────────────────────────────────────────
 *  1. Go to https://formspree.io and click "Get Started Free"
 *  2. Sign up with thirumalaithiruvasan@gmail.com
 *  3. Click "+ New Form", name it "Portfolio Contact"
 *  4. Copy your Form ID — it looks like: xpzvwkab
 *  5. Paste it into assets/js/config.js  →  formspreeId: 'xpzvwkab'
 *  6. Also add it as a GitHub Secret named FORMSPREE_ID for deployment
 *  7. Verify your email when Formspree sends you a confirmation
 * ─────────────────────────────────────────────────────────────────────────────
 */

const ContactForm = (() => {
  'use strict';

  // ── Configuration ─────────────────────────────────────────────────────────
  // Loaded from assets/js/config.js (gitignored).
  // On GitHub Pages it is injected at build time via the FORMSPREE_ID secret.
  const FORM_ID    = (window.SITE_CONFIG && window.SITE_CONFIG.formspreeId) || '';
  const ENDPOINT   = () => `https://formspree.io/f/${FORM_ID}`;
  const isReady    = () => FORM_ID !== '' && FORM_ID !== 'YOUR_FORMSPREE_ID';

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
  function initFloatingLabels() {
    form.querySelectorAll('input, textarea').forEach(input => {
      const sync = () =>
        input.value
          ? input.classList.add('has-value')
          : input.classList.remove('has-value');

      sync();
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

    if (Object.values(fields).some(v => !v)) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }
    if (!isReady()) {
      showStatus(
        'Contact form not configured yet. Please email me at thirumalaithiruvasan@gmail.com',
        'error'
      );
      return;
    }

    showStatus('Sending your message\u2026', 'loading');
    setSubmitting(true);

    try {
      const res = await fetch(ENDPOINT(), {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    buildPayload(fields),
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        resetForm();
        showStatus("Message sent! I\u2019ll get back to you soon. \u2713", 'success');
      } else {
        // Surface Formspree's own error message when available
        const msg = json.error || (json.errors && json.errors.map(e => e.message).join(', '));
        throw new Error(msg || `HTTP ${res.status}`);
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

  // ── Payload builder ───────────────────────────────────────────────────────
  function buildPayload({ name, email, subject, message }) {
    const fd = new FormData();
    fd.append('name',      name);
    fd.append('email',     email);
    fd.append('_replyto',  email);
    fd.append('_subject',  `Portfolio Contact: ${subject}`);
    fd.append('message',   message);
    fd.append('_gotcha',   '');   // honeypot — leave blank; bots fill it and get blocked
    return fd;
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
