document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });

  const billingButtons = document.querySelectorAll('.toggle-pill button');
  const monthlyEls = document.querySelectorAll('[data-monthly]');
  const annualEls = document.querySelectorAll('[data-annual]');
  billingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      billingButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const annual = btn.dataset.billing === 'annual';
      monthlyEls.forEach(el => el.style.display = annual ? 'none' : '');
      annualEls.forEach(el => el.style.display = annual ? '' : 'none');
    });
  });

  const form = document.querySelector('#signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const card = form.closest('.form-card');
      card.innerHTML = '<div style="text-align:center;padding:24px 0;">' +
        '<h3 style="margin-bottom:10px;">You\'re on the list</h3>' +
        '<p style="margin-bottom:0;">Thanks for your interest in TargetBooker. We\'ll be in touch within one business day to set up your venue.</p>' +
        '</div>';
    });
  }
});
